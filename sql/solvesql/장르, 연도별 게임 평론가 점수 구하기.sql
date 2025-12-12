SELECT
  gn.name as genre,
  ROUND(
    AVG(
      CASE
        when g.year = 2011 THEN g.critic_score
      end
    ),
    2
  ) as score_2011,
  ROUND(
    AVG(
      CASE
        when g.year = 2012 THEN g.critic_score
      end
    ),
    2
  ) as score_2012,
  ROUND(
    AVG(
      CASE
        when g.year = 2013 THEN g.critic_score
      end
    ),
    2
  ) as score_2013,
  ROUND(
    AVG(
      CASE
        when g.year = 2014 THEN g.critic_score
      end
    ),
    2
  ) as score_2014,
  ROUND(
    AVG(
      CASE
        when g.year = 2015 THEN g.critic_score
      end
    ),
    2
  ) as score_2015
FROM
  games g
  JOIN genres gn on gn.genre_id = g.genre_id
WHERE
  g.year BETWEEN 2011 and 2015
GROUP by
  gn.name

