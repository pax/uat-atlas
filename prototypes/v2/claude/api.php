<?php
/**
 * CityProfiler API
 * Optional PHP backend for dynamic queries
 * Can be used instead of static JSON files if preferred
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Database configuration
$db_file = __DIR__ . '/data/cities.db';

// Check if database exists
if (!file_exists($db_file)) {
    http_response_code(500);
    echo json_encode(['error' => 'Database not found']);
    exit;
}

// Get request parameters
$action = $_GET['action'] ?? 'cities';
$city_id = $_GET['city_id'] ?? null;
$category = $_GET['category'] ?? null;

try {
    // Connect to SQLite database
    $db = new PDO('sqlite:' . $db_file);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    switch ($action) {
        case 'cities':
            // Get all cities with basic info
            $stmt = $db->prepare('
                SELECT c.*, 
                       GROUP_CONCAT(cm.meta_id || ":" || cm.value) as meta_values
                FROM cities c
                LEFT JOIN city_meta cm ON c.ID = cm.City_ID
                GROUP BY c.ID
                ORDER BY c.rank
            ');
            $stmt->execute();
            $cities = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            // Parse meta values
            foreach ($cities as &$city) {
                $meta = [];
                if ($city['meta_values']) {
                    $meta_pairs = explode(',', $city['meta_values']);
                    foreach ($meta_pairs as $pair) {
                        list($key, $value) = explode(':', $pair, 2);
                        $meta[$key] = $value;
                    }
                }
                $city['meta'] = $meta;
                unset($city['meta_values']);
            }
            
            echo json_encode($cities);
            break;
            
        case 'stats':
            // Get city statistics
            if ($city_id) {
                $stmt = $db->prepare('
                    SELECT category, count 
                    FROM city_stats 
                    WHERE City_ID = :city_id
                ');
                $stmt->execute(['city_id' => $city_id]);
            } else {
                $stmt = $db->prepare('
                    SELECT City_ID, category, count 
                    FROM city_stats
                    ORDER BY City_ID, category
                ');
                $stmt->execute();
            }
            
            $stats = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($stats);
            break;
            
        case 'categories':
            // Get all categories
            $stmt = $db->prepare('
                SELECT DISTINCT Category, api_ctg 
                FROM categories 
                ORDER BY Category
            ');
            $stmt->execute();
            $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($categories);
            break;
            
        case 'compare':
            // Compare multiple cities
            $city_ids = explode(',', $_GET['cities'] ?? '');
            if (count($city_ids) < 2) {
                throw new Exception('Please provide at least 2 city IDs');
            }
            
            $placeholders = implode(',', array_fill(0, count($city_ids), '?'));
            $stmt = $db->prepare("
                SELECT c.*, cs.category, cs.count
                FROM cities c
                LEFT JOIN city_stats cs ON c.ID = cs.City_ID
                WHERE c.ID IN ($placeholders)
                ORDER BY c.ID, cs.category
            ");
            $stmt->execute($city_ids);
            
            $result = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if (!isset($result[$row['ID']])) {
                    $result[$row['ID']] = [
                        'id' => $row['ID'],
                        'name' => $row['name'],
                        'county' => $row['county'],
                        'population' => $row['pop'],
                        'area' => $row['area'],
                        'stats' => []
                    ];
                }
                if ($row['category']) {
                    $result[$row['ID']]['stats'][$row['category']] = $row['count'];
                }
            }
            
            echo json_encode(array_values($result));
            break;
            
        case 'search':
            // Search cities by name
            $query = $_GET['q'] ?? '';
            if (strlen($query) < 2) {
                echo json_encode([]);
                break;
            }
            
            $stmt = $db->prepare('
                SELECT ID, name, county, pop 
                FROM cities 
                WHERE name LIKE :query 
                ORDER BY rank 
                LIMIT 10
            ');
            $stmt->execute(['query' => '%' . $query . '%']);
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($results);
            break;
            
        case 'rankings':
            // Get rankings for a specific criterion
            $weights = json_decode($_GET['weights'] ?? '{}', true);
            if (empty($weights)) {
                // Default equal weights
                $stmt = $db->query('SELECT DISTINCT Category FROM categories');
                $categories = $stmt->fetchAll(PDO::FETCH_COLUMN);
                $weights = array_fill_keys($categories, 1 / count($categories));
            }
            
            // Calculate scores
            $stmt = $db->prepare('
                SELECT c.*, cs.category, cs.count
                FROM cities c
                LEFT JOIN city_stats cs ON c.ID = cs.City_ID
                ORDER BY c.ID, cs.category
            ');
            $stmt->execute();
            
            $cities = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if (!isset($cities[$row['ID']])) {
                    $cities[$row['ID']] = [
                        'id' => $row['ID'],
                        'name' => $row['name'],
                        'population' => $row['pop'],
                        'score' => 0,
                        'stats' => []
                    ];
                }
                if ($row['category'] && isset($weights[$row['category']])) {
                    $normalized = $row['pop'] > 0 ? ($row['count'] / $row['pop']) * 100000 : 0;
                    $cities[$row['ID']]['score'] += $normalized * $weights[$row['category']];
                    $cities[$row['ID']]['stats'][$row['category']] = $row['count'];
                }
            }
            
            // Sort by score
            usort($cities, function($a, $b) {
                return $b['score'] <=> $a['score'];
            });
            
            // Add rank
            foreach ($cities as $index => &$city) {
                $city['rank'] = $index + 1;
            }
            
            echo json_encode(array_values($cities));
            break;
            
        default:
            throw new Exception('Invalid action');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
