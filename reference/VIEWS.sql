CREATE VIEW city_scores AS
WITH counts_normed AS (
  SELECT cs.category, cs.City_ID, 
         cs.count * 1.0 / c.pop AS normed_count
    FROM city_stats cs
    JOIN cities c ON cs.City_ID = c.ID
),
score_calc AS (
  SELECT 
    category,
    MIN(normed_count) AS min_val,
    MAX(normed_count) AS max_val,
    AVG(normed_count) AS avg_val
  FROM counts_normed
  GROUP BY category
),
scored AS (
  SELECT
    c.category,
    c.City_ID,
    c.normed_count,
    CASE WHEN sc.max_val = sc.min_val THEN 100
      ELSE ROUND(((c.normed_count - sc.min_val) / (sc.max_val - sc.min_val)) * 100, 2)
    END AS score
  FROM counts_normed c
  JOIN score_calc sc ON c.category = sc.category
)
SELECT category, City_ID, score, normed_count FROM scored;


CREATE VIEW category_stats AS
WITH counts_normed AS (
  SELECT cs.category, cs.City_ID, cs.count * 1.0 / c.pop AS normed_count
  FROM city_stats cs
  JOIN cities c ON cs.City_ID = c.ID
),
avgs AS (
  SELECT category, AVG(normed_count) AS avg_normed
  FROM counts_normed
  GROUP BY category
),
medians AS (
  SELECT category, normed_count AS median_normed FROM (
    SELECT category, normed_count,
      ROW_NUMBER() OVER (PARTITION BY category ORDER BY normed_count) AS rn,
      COUNT(*) OVER (PARTITION BY category) AS cnt
    FROM counts_normed
  ) WHERE rn = (cnt + 1) / 2
)
SELECT a.category,
       a.avg_normed,
       m.median_normed
FROM avgs a LEFT JOIN medians m ON a.category = m.category;