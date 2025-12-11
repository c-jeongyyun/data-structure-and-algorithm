WITH
  k_volleyball_records as (
    SELECT
      r.athlete_id,
      g.year
    FROM
      records r
      JOIN games g ON g.id = r.game_id
      JOIN events e ON e.id = r.event_id
      JOIN teams t ON t.id = r.team_id
    WHERE
      e.event = 'Volleyball Women''s Volleyball'
      AND t.team = 'KOR'
      AND g.season = 'Summer'
      AND r.sex = 'F'
  ),
  with_past_year as (
    SELECT
      kvr.athlete_id,
      kvr.year,
      LAG(year) OVER (
        PARTITION BY
          kvr.athlete_id
        ORDER BY
          kvr.year
      ) as past_year
    FROM
      k_volleyball_records kvr
  )
SELECT
  a.id,
  a.name
FROM
  with_past_year wpy
  JOIN athletes a on a.id = wpy.athlete_id
WHERE wpy.year = wpy.past_year+4
GROUP BY
  a.id