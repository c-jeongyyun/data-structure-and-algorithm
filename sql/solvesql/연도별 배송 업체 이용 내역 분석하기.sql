-- 반품 시 일반 배송 1회 추가
-- 연도별 배송 이용건수 : 배송 방법 별로
-- 일단 심플하게 배송방법 별로 더하는 것 구해보기
-- 행 ->열로 ? 숫자표기 포함 by case when 
SELECT
  EXTRACT(
    year
    from
      t.purchased_at
  ) as year,
  SUM(
    CASE
      WHEN (
        t.shipping_method = 'Standard'
        AND t.is_returned = TRUE
      ) THEN 2
      WHEN (
        t.shipping_method = 'Standard'
        OR t.is_returned = TRUE
      ) THEN 1
      ELSE 0
    END
  ) as standard,
  SUM(
    CASE
      WHEN t.shipping_method = 'Overnight' THEN 1
      ELSE 0
    END
  ) as overnight,
  SUM(
    CASE
      WHEN t.shipping_method = 'Express' THEN 1
      ELSE 0
    END
  ) as express
FROM
  transactions t
WHERE
  is_online_order = TRUE
GROUP BY
  EXTRACT(
    year
    from
      t.purchased_at
  )
ORDER by
  year ASC