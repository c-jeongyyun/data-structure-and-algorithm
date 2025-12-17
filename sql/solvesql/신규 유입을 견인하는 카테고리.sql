-- 어떤 상품 카테고리가 신규 고객의 첫 구매를 가장 강력하게 유도하는지
-- 모든 카테고리와 서브 카테고리의 조합
-- 에 포함된 상품이 각 사용자의 "첫 구매"로 "주문된 건수"
-- 첫 주문 건수가 많은 순서대로 내림차순
-- 모든 카테고리와 서브 카테고리의 조합에 대해 첫구매 주문 건수 구하기
-- 첫 구매: 고객의 첫 주문일 === 주문날짜
-- 모든 카테고리와 서브 카테고리의 조합: 상품별로 발생 - order_id로 묶이면 안됨.
-- 같은 주문 id면 하나의 주문으로 취급

SELECT
  r.category,
  r.sub_category,
  count(DISTINCT order_id) as cnt_orders
FROM
  records r
  JOIN customer_stats cs on r.customer_id = cs.customer_id
WHERE
  r.order_date = cs.first_order_date
GROUP BY
  r.category,
  r.sub_category
  ORDER by cnt_orders DESC
