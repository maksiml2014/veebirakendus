#uususususServlet
SELECT candidate.name , party.name, region.name FROM candidate, party, region WHERE candidate.party_id=party.id AND candidate.region_id=region.id;


#partei
SELECT candidate.id, candidate.name, party.name, region.name 
FROM candidate, party, region
WHERE candidate.party_id=party.id 
AND
candidate.region_id=region.id
