<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

try {
    // Get view type parameter (parent or raw)
    $viewType = isset($_GET['view']) ? $_GET['view'] : 'parent';

    // Open SQLite database
    $db = new PDO('sqlite:data/cities.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($viewType === 'raw') {
        // Get all raw categories
        $categoriesStmt = $db->query("
            SELECT DISTINCT category
            FROM city_stats
            ORDER BY category
        ");
        $categories = $categoriesStmt->fetchAll(PDO::FETCH_COLUMN);

        // Get cities with their raw category scores
        $citiesStmt = $db->query("
            SELECT
                c.ID,
                c.name,
                c.county,
                c.pop,
                sc.category,
                sc.score
            FROM cities c
            LEFT JOIN city_scores sc ON c.ID = sc.City_ID
            ORDER BY c.pop DESC
        ");

        // Organize data by city
        $citiesData = [];
        while ($row = $citiesStmt->fetch(PDO::FETCH_ASSOC)) {
            $cityId = $row['ID'];

            if (!isset($citiesData[$cityId])) {
                $citiesData[$cityId] = [
                    'id' => $row['ID'],
                    'name' => $row['name'],
                    'county' => $row['county'],
                    'population' => $row['pop'],
                    'scores' => []
                ];
            }

            if ($row['category']) {
                $citiesData[$cityId]['scores'][$row['category']] = $row['score'];
            }
        }

        // Convert to array and ensure all cities have all categories (even if null)
        // Also calculate average score across all categories
        $cities = array_values($citiesData);
        foreach ($cities as &$city) {
            $totalScore = 0;
            $scoreCount = 0;

            foreach ($categories as $category) {
                if (!isset($city['scores'][$category])) {
                    $city['scores'][$category] = null;
                } else {
                    $totalScore += $city['scores'][$category];
                    $scoreCount++;
                }
            }

            // Calculate average score (only for categories with data)
            $city['average_score'] = $scoreCount > 0 ? round($totalScore / $scoreCount, 2) : null;
        }

    } else {
        // Parent category view (original functionality)
        $categoriesStmt = $db->query("
            SELECT DISTINCT parent_category
            FROM categories
            ORDER BY parent_category
        ");
        $categories = $categoriesStmt->fetchAll(PDO::FETCH_COLUMN);

        // Get cities with their scores aggregated by parent category
        $citiesStmt = $db->query("
            SELECT
                c.ID,
                c.name,
                c.county,
                c.pop,
                cs.parent_category,
                ROUND(AVG(sc.score), 2) AS avg_score
            FROM cities c
            LEFT JOIN city_stats cs ON c.ID = cs.City_ID
            LEFT JOIN city_scores sc ON cs.City_ID = sc.City_ID AND cs.category = sc.category
            GROUP BY c.ID, c.name, c.county, c.pop, cs.parent_category
            ORDER BY c.pop DESC
        ");

        // Organize data by city
        $citiesData = [];
        while ($row = $citiesStmt->fetch(PDO::FETCH_ASSOC)) {
            $cityId = $row['ID'];

            if (!isset($citiesData[$cityId])) {
                $citiesData[$cityId] = [
                    'id' => $row['ID'],
                    'name' => $row['name'],
                    'county' => $row['county'],
                    'population' => $row['pop'],
                    'scores' => []
                ];
            }

            if ($row['parent_category']) {
                $citiesData[$cityId]['scores'][$row['parent_category']] = $row['avg_score'];
            }
        }

        // Convert to array and ensure all cities have all categories (even if null)
        // Also calculate average score across all categories
        $cities = array_values($citiesData);
        foreach ($cities as &$city) {
            $totalScore = 0;
            $scoreCount = 0;

            foreach ($categories as $category) {
                if (!isset($city['scores'][$category])) {
                    $city['scores'][$category] = null;
                } else {
                    $totalScore += $city['scores'][$category];
                    $scoreCount++;
                }
            }

            // Calculate average score (only for categories with data)
            $city['average_score'] = $scoreCount > 0 ? round($totalScore / $scoreCount, 2) : null;
        }
    }

    // Return response
    echo json_encode([
        'success' => true,
        'view' => $viewType,
        'categories' => $categories,
        'cities' => $cities
    ], JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
