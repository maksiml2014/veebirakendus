# Populate user
INSERT INTO user VALUES (1, "Mari Maasikas");
INSERT INTO user VALUES (2, "Kati Maasikas");
INSERT INTO user VALUES (3, "Olev Kuusk");
INSERT INTO user VALUES (4, "Eduard Ekskavaator");
INSERT INTO user VALUES (5, "Magdalena Malejeva");
INSERT INTO user VALUES (6, "Neeme Näljahäda");
INSERT INTO user VALUES (7, "Olga Oravasaba");
INSERT INTO user VALUES (8, "Ferdinand Fuksia");
INSERT INTO user VALUES (9, "Gerhard Gätegõverdus");
INSERT INTO user VALUES (10, "Harald Hamster");
INSERT INTO user VALUES (11, "Ildegaard Ilumeel");
INSERT INTO user VALUES (12, "Janaida Jalutova");
INSERT INTO user VALUES (13, "Kõikme Kannatameära");
INSERT INTO user VALUES (14, "Filbert Hollins");
INSERT INTO user VALUES (15, "Ulrich Van Andringa");
INSERT INTO user VALUES (16, "Carl Zino");



# Populate region
INSERT INTO region VALUES (1, "Valimisringkond nr 1 - Tallinna Haabersti, Põhja-Tallinna ja Kristiine linnaosa", "");
INSERT INTO region VALUES (2, "Valimisringkond nr 2 - Tallinna Kesklinna, Lasnamäe ja Pirita linnaosa", "");
INSERT INTO region VALUES (3, "Valimisringkond nr 3 - Tallinna Mustamäe ja Nõmme linnaosa", "");
INSERT INTO region VALUES (4, "Valimisringkond nr 4 - Harju- (v.a Tallinn) ja Raplamaa", "");
INSERT INTO region VALUES (5, "Valimisringkond nr 5 - Hiiu-, Lääne- ja Saaremaa", "");
INSERT INTO region VALUES (6, "Valimisringkond nr 6 - Lääne-Virumaa", "");
INSERT INTO region VALUES (7, "Valimisringkond nr 7 - Ida-Virumaa", "");
INSERT INTO region VALUES (8, "Valimisringkond nr 8 - Järva- ja Viljandimaa", "");
INSERT INTO region VALUES (9, "Valimisringkond nr 9 - Jõgeva- ja Tartumaa (v.a Tartu linn)", "");
INSERT INTO region VALUES (10, "Valimisringkond nr 10 - Tartu linn", "");
INSERT INTO region VALUES (11, "Valimisringkond nr 11 - Võru-, Valga- ja Põlvamaa", "");
INSERT INTO region VALUES (12, "Valimisringkond nr 12 - Pärnumaa", "");

# Populate party
INSERT INTO party VALUES (1, "Üksikandidaat", "", "");
INSERT INTO party VALUES (2, "Eesti Rahvameele erakond", "", "");
INSERT INTO party VALUES (3, "Erakond Vali Meid", "", "");
INSERT INTO party VALUES (4, "Eesti Kohalik Koduerakond", "", "");
INSERT INTO party VALUES (5, "Erakond Uudne Kodu", "", "");
INSERT INTO party VALUES (6, "Erakond Tasakaalukus", "", "");
INSERT INTO party VALUES (7, "Eestimaa Ühendatud Taimetoitlased", "", "");
INSERT INTO party VALUES (8, "Erakond Eesti Sinised Vabanikud", "", "");
INSERT INTO party VALUES (9, "Erakond Roheline Muru Meile", "", "");
INSERT INTO party VALUES (10, "Eesti Riiklik Tasapinna Kogu", "", "");
INSERT INTO party VALUES (11, "Rahvaeitav Erakond", "", "");


# Populate candidate (id INTEGER, name VARCHAR(50), photo VARCHAR(100), addinfo VARCHAR(1000), region_id INT region(id), party_id INT party(id) );
#region 1-12, party 1-11
INSERT INTO candidate VALUES (1, "Magdalena Malejeva", "", "", 1,11);
INSERT INTO candidate VALUES (2, "Neeme Näljahäda", "", "", 1,10);
INSERT INTO candidate VALUES (3, "Olga Oravasaba", "", "", 2,9);
INSERT INTO candidate VALUES (4, "Eduard Ekskavaator", "", "", 12,8);
INSERT INTO candidate VALUES (5, "Ferdinand Fuksia", "", "", 3,7);
INSERT INTO candidate VALUES (6, "Gerhard Gätegõverdus", "", "", 4,6);
INSERT INTO candidate VALUES (7, "Harald Hamster", "", "", 5,5);
INSERT INTO candidate VALUES (8, "Ildegaard Ilumeel", "", "", 6,4);
INSERT INTO candidate VALUES (9, "Janaida Jalutova", "", "", 7,3);
INSERT INTO candidate VALUES (10, "Kõikme Kannatameära", "", "", 8,2);
INSERT INTO candidate VALUES (11, "Filbert Hollins", "", "", 9,1);
INSERT INTO candidate VALUES (12, "Ulrich Van Andringa", "", "", 10,1);
INSERT INTO candidate VALUES (13, "Carl Zino", "", "", 11,1);

# Populate vote
# users 1-16, candidate 1-13
INSERT INTO vote (user_id, candidate_id) VALUES (1,13);
INSERT INTO vote (user_id, candidate_id) VALUES (2,4);
INSERT INTO vote (user_id, candidate_id) VALUES (3,4);
INSERT INTO vote (user_id, candidate_id) VALUES (4,4);
INSERT INTO vote (user_id, candidate_id) VALUES (5,4);
INSERT INTO vote (user_id, candidate_id) VALUES (6,12);
INSERT INTO vote (user_id, candidate_id) VALUES (7,11);
INSERT INTO vote (user_id, candidate_id) VALUES (8,10);
INSERT INTO vote (user_id, candidate_id) VALUES (9,9);
INSERT INTO vote (user_id, candidate_id) VALUES (10,8);
INSERT INTO vote (user_id, candidate_id) VALUES (11,7);
INSERT INTO vote (user_id, candidate_id) VALUES (12,6);
INSERT INTO vote (user_id, candidate_id) VALUES (13,5);
INSERT INTO vote (user_id, candidate_id) VALUES (14,3);
INSERT INTO vote (user_id, candidate_id) VALUES (15,2);
INSERT INTO vote (user_id, candidate_id) VALUES (16,1);




