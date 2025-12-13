SELECT
  a.first_name, a.last_name, sum(p.amount) as total_revenue
FROM
  rental r
  JOIN payment p on p.rental_id = r.rental_id
  JOIN inventory i on i.inventory_id = r.inventory_id
  JOIN film f on f.film_id = i.film_id
  JOIN film_actor fa on fa.film_id = f.film_id
  JOIN actor a on a.actor_id = fa.actor_id
GROUP by a.actor_id
ORDER by total_revenue DESC
LIMIT 5