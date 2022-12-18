DROP TABLE IF EXISTS pracownicy;
DROP TABLE IF EXISTS wydzialy;

CREATE TABLE pracownicy (
id_prac INT NOT NULL PRIMARY KEY,
im_i_nazw CHAR(20),
d_ur DATE,
numer_wydz INT) ENGINE = InnoDB;


INSERT INTO pracownicy (id_prac, im_i_nazw, d_ur, numer_wydz) 
VALUES (7513, 'Ewa Nowacka', '1967-05-02', 128);
INSERT INTO pracownicy (id_prac, im_i_nazw, d_ur, numer_wydz) 
VALUES (9842, 'Bartosz Kowalski', '1957-09-15', 42);
INSERT INTO pracownicy (id_prac, im_i_nazw, d_ur, numer_wydz) 
VALUES (6651, 'Andrzej Plater', '1978-12-22', 128);
INSERT INTO pracownicy (id_prac, im_i_nazw, d_ur, numer_wydz) 
VALUES (9006, 'Barbara Cetryk', '1963-09-19', 128);

SELECT * FROM pracownicy;

CREATE TABLE wydzialy (
numer_wydz INT NOT NULL PRIMARY KEY,
nazwa_wydz CHAR(20)) ENGINE = InnoDB;

INSERT INTO wydzialy (numer_wydz, nazwa_wydz)
VALUES (42, 'Finanse');
INSERT INTO wydzialy (numer_wydz, nazwa_wydz)
VALUES (128, 'Badania i Rozw');

SELECT * FROM wydzialy;

SELECT im_i_nazw
FROM pracownicy
WHERE d_ur BETWEEN '1960-01-01'
AND '1970-01-01';

SELECT im_i_nazw, numer_wydz
FROM pracownicy 
WHERE numer_wydz=(SELECT numer_wydz FROM
pracownicy WHERE im_i_nazw='Ewa Nowacka');

SELECT COUNT(*) AS liczba_prac FROM pracownicy; 

SELECT COUNT(*), numer_wydz
FROM pracownicy
GROUP BY numer_wydz; 

SELECT pracownicy.id_prac, pracownicy.im_i_nazw, 
pracownicy.numer_wydz, wydzialy.nazwa_wydz
FROM pracownicy INNER JOIN wydzialy
ON pracownicy.numer_wydz=wydzialy.numer_wydz;

SELECT COUNT(*), pracownicy.numer_wydz, 
wydzialy.nazwa_wydz 
FROM pracownicy INNER JOIN wydzialy
ON pracownicy.numer_wydz=wydzialy.numer_wydz
GROUP BY pracownicy.numer_wydz;

ALTER  TABLE pracownicy add FOREIGN KEY (numer_wydz) 
REFERENCES wydzialy (numer_wydz);

