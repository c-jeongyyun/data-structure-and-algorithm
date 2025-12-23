
-- A: id가 10으로 나누어 떨어짐, B: 그외
-- A/B 버킷 구분 => 버킷별 "사용자 수" &  버킷별 평균 주문 수 , 평균 주문 금액
-- => 결국 다 사용자 기준의 값임.
-- => 1. 사용자별 총 값을 구한 다음. 2. 평균내면 된다.
-- 반품 주문 제외 
-- 평균값 소숫점 셋째자리에서 반올림


-- window 함수로 카운팅한 것을 평균낼 때 주의해야함.
-- window 함수는 행마다 값이 하나씩 생김 -> 평균낼 때, 그룹핑한 기준과 window 함수로 만들어내는 기준이 동일한지 확인필요. 
-- ex. grouping은 bucket 기준, window 함수는 customer의 transaction행마다 count 값을 만들어 냈음. 사용자별로 한번씩만 count를 더해야 하는데, 행이 transaction 마다 생겨버리니, SUM(count * customer 별 transaction개수)/(BUCKET 개수) 를 계산 해버림.


WITH
  with_bucket as (
    SELECT
      customer_id, 
      (
        CASE
          WHEN MOD(customer_id, 10) = 0 THEN 'A'
          ELSE 'B'
        END
      ) as bucket, 
      COUNT(*) as order_count, 
      SUM(total_price) as total_revenue
    FROM
      transactions
    WHERE
      is_returned = FALSE
    GROUP BY customer_id
  )
SELECT
  bucket,
  COUNT(customer_id) as user_count,
  ROUND(AVG(order_count), 2) as avg_orders,
  ROUND(AVG(total_revenue), 2) as avg_revenue
FROM
  with_bucket
GROUP BY
  bucket

