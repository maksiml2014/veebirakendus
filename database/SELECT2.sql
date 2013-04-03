
#StatPartei
SELECT p.name, (count(p.id)/(SELECT count(id) FROM vote))*100 as pc, count(p.id) as votes FROM party p,candidate c,vote v WHERE v.candidate_id = c.id AND c.party_id = p.id AND NOT p.id = 1 GROUP by p.id UNION SELECT c.name, (count(c.id)/(SELECT count(id) FROM vote))*100 as pc, count(c.id) as votes FROM candidate c, vote v WHERE v.candidate_id = c.id AND c.party_id = 1 GROUP by c.id UNION SELECT 'ALL' as name, 100 as pc, count(id) from vote;

#StatCandidate
SELECT c.name, (count(c.id)/(SELECT count(id) FROM vote))*100 as pc, count(c.id) as votes FROM candidate c, vote v WHERE v.candidate_id = c.id AND c.party_id = 1 GROUP by c.id









statpartei new
SELECT p.name, (count(p.id)/(SELECT count(id) FROM vote))*100 as pc, count(p.id) as votes 
FROM party p,candidate c,vote v
WHERE v.candidate_id = c.id AND c.party_id = p.id AND NOT p.id = 1 AND c.region_id LIKE '%' AND c.party_id LIKE '%'
GROUP by p.id 
UNION 
SELECT c.name, (count(c.id)/(SELECT count(id) FROM vote))*100 as pc, count(c.id) as votes
 FROM candidate c, vote v 
WHERE v.candidate_id = c.id AND c.party_id = 1 AND c.region_id LIKE '%' AND c.party_id LIKE '%'
GROUP by c.id 




