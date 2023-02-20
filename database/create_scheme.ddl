
-- utworzenie uzytkownika i bazy danych
create user filmbookapi_user with encrypted password 'Jh!8a82J$ka2kls91R';
create database filmbook;

-- wejscie do bazy danych
\c filmbook;


-- realcje i ograniczenia

CREATE TABLE czlowiek_kina (
    id             SERIAL NOT NULL,
    imie           VARCHAR(128) NOT NULL,
    nazwisko       VARCHAR(128) NOT NULL,
    data_urodzenia DATE,
    opis           TEXT
);

ALTER TABLE czlowiek_kina ADD CONSTRAINT czlowiek_kina_pk PRIMARY KEY ( id );

CREATE TABLE film (
    id                      SERIAL NOT NULL,
    tytul_polski            VARCHAR(512),
    tytul_orginalny         VARCHAR(512) NOT NULL,
    data_swiatowej_premiery DATE,
    data_polskiej_premiery  DATE,
    czas_trwania            INTEGER,
    opis                    TEXT,
    czlowiek_kina_id        INTEGER
);

alter table film add column srednia_ocen numeric(5,3);

ALTER TABLE film ADD CONSTRAINT film_pk PRIMARY KEY ( id );

CREATE TABLE gatunek (
    id    SERIAL NOT NULL,
    nazwa VARCHAR(256) NOT NULL
);

ALTER TABLE gatunek ADD CONSTRAINT gatunek_pk PRIMARY KEY ( id );

CREATE TABLE ocena (
    id            SERIAL NOT NULL,
    ocena         INTEGER NOT NULL,
    uzasadnienie  TEXT,
    serial_id     INTEGER,
    film_id       INTEGER,
    uzytkownik_id INTEGER NOT NULL
);

ALTER TABLE ocena
    ADD CONSTRAINT arc_1 CHECK ( ( ( film_id IS NOT NULL )
                                   AND ( serial_id IS NULL ) )
                                 OR ( ( serial_id IS NOT NULL )
                                      AND ( film_id IS NULL ) ) );

ALTER TABLE ocena ADD CONSTRAINT ocena_pk PRIMARY KEY ( id );

ALTER TABLE ocena ADD UNIQUE (film_id, uzytkownik_id);

CREATE TABLE odcinek (
    id              SERIAL NOT NULL,
    tytul_polski    VARCHAR(512),
    tytul_orginalny VARCHAR(512) NOT NULL,
    nr_odcinka      INTEGER NOT NULL,
    opis            TEXT,
    sezon_id        INTEGER NOT NULL
);

ALTER TABLE odcinek ADD CONSTRAINT odcinek_pk PRIMARY KEY ( id );

CREATE TABLE ranga (
    id            SERIAL NOT NULL,
    nazwa         VARCHAR(256) NOT NULL
);

ALTER TABLE ranga ADD CONSTRAINT ranga_pk PRIMARY KEY ( id );

--alter table ranga drop column uzytkownik_id;

insert into ranga(nazwa) values ('Admin');
insert into ranga(nazwa) values ('User');

CREATE TABLE uprawnienia_rang (
    ranga_id          INTEGER NOT NULL,
    uprawnienie_nazwa VARCHAR(126) NOT NULL
);

ALTER TABLE uprawnienia_rang ADD CONSTRAINT uprawnienia_rang_pk PRIMARY KEY ( ranga_id,
                                                                    uprawnienie_nazwa );

CREATE TABLE gatunki_filmow (
    film_id    INTEGER NOT NULL,
    gatunek_id INTEGER NOT NULL
);

ALTER TABLE gatunki_filmow ADD CONSTRAINT gatunki_filmow_pk PRIMARY KEY ( film_id,
                                                                  gatunek_id );

CREATE TABLE rola (
    id               SERIAL NOT NULL,
    bohater          VARCHAR(256) NOT NULL,
    opis             TEXT,
    czlowiek_kina_id INTEGER,
    film_id          INTEGER,
    serial_id        INTEGER
);

ALTER TABLE rola
    ADD CONSTRAINT arc_2 CHECK ( ( ( film_id IS NOT NULL )
                                   AND ( serial_id IS NULL ) )
                                 OR ( ( serial_id IS NOT NULL )
                                      AND ( film_id IS NULL ) ) );

ALTER TABLE rola ADD CONSTRAINT rola_pk PRIMARY KEY ( id );

CREATE TABLE serial (
    id               SERIAL NOT NULL,
    tytul_polski     VARCHAR(512),
    tytul_orginalny  VARCHAR(512) NOT NULL,
    opis             TEXT,
    czlowiek_kina_id INTEGER
);

ALTER TABLE serial ADD CONSTRAINT serial_pk PRIMARY KEY ( id );

CREATE TABLE sezon (
    id               SERIAL NOT NULL,
    tytul_polski     VARCHAR(512),
    tytul_oryginalny VARCHAR(512) NOT NULL,
    nr_sezonu        INTEGER NOT NULL,
    opis             TEXT,
    serial_id        INTEGER NOT NULL
);

ALTER TABLE sezon ADD CONSTRAINT sezon_pk PRIMARY KEY ( id );

CREATE TABLE uprawnienie (
    nazwa VARCHAR(126) NOT NULL,
    opis  TEXT
);

ALTER TABLE uprawnienie ADD CONSTRAINT uprawnienie_pk PRIMARY KEY ( nazwa );

CREATE TABLE uzytkownik (
    id             SERIAL NOT NULL,
    nazwa          VARCHAR(126) NOT NULL,
    email          VARCHAR(256) NOT NULL,
    nr_telefonu    VARCHAR(14),
    data_urodzenia DATE,
    ranga_id       INTEGER DEFAULT 2
);

ALTER TABLE uzytkownik ADD password VARCHAR(255);
ALTER TABLE uzytkownik ADD refreshToken VARCHAR(256);

ALTER TABLE uzytkownik ADD CONSTRAINT uzytkownik_pk PRIMARY KEY ( id );

ALTER TABLE uzytkownik
    ADD CONSTRAINT uzytkownik_ranga_fk FOREIGN KEY ( ranga_id )
        REFERENCES ranga ( id );

ALTER TABLE film
    ADD CONSTRAINT film_czlowiek_kina_fk FOREIGN KEY ( czlowiek_kina_id )
        REFERENCES czlowiek_kina ( id );

ALTER TABLE ocena
    ADD CONSTRAINT ocena_film_fk FOREIGN KEY ( film_id )
        REFERENCES film ( id );

ALTER TABLE ocena
    ADD CONSTRAINT ocena_serial_fk FOREIGN KEY ( serial_id )
        REFERENCES serial ( id );

ALTER TABLE ocena
    ADD CONSTRAINT ocena_uzytkownik_fk FOREIGN KEY ( uzytkownik_id )
        REFERENCES uzytkownik ( id );

ALTER TABLE odcinek
    ADD CONSTRAINT odcinek_sezon_fk FOREIGN KEY ( sezon_id )
        REFERENCES sezon ( id );

ALTER TABLE uprawnienia_rang
    ADD CONSTRAINT uprawnienia_rang_ranga_fk FOREIGN KEY ( ranga_id )
        REFERENCES ranga ( id ) ON DELETE CASCADE;

ALTER TABLE uprawnienia_rang
    ADD CONSTRAINT uprawnienia_rang_uprawnienie_fk FOREIGN KEY ( uprawnienie_nazwa )
        REFERENCES uprawnienie ( nazwa );

ALTER TABLE gatunki_filmow
    ADD CONSTRAINT gatunki_filmow_film_fk FOREIGN KEY ( film_id )
        REFERENCES film ( id );

ALTER TABLE gatunki_filmow
    ADD CONSTRAINT gatunki_filmow_gatunek_fk FOREIGN KEY ( gatunek_id )
        REFERENCES gatunek ( id );

ALTER TABLE rola
    ADD CONSTRAINT rola_czlowiek_kina_fk FOREIGN KEY ( czlowiek_kina_id )
        REFERENCES czlowiek_kina ( id );

ALTER TABLE rola
    ADD CONSTRAINT rola_film_fk FOREIGN KEY ( film_id )
        REFERENCES film ( id );

ALTER TABLE rola
    ADD CONSTRAINT rola_serial_fk FOREIGN KEY ( serial_id )
        REFERENCES serial ( id );

ALTER TABLE serial
    ADD CONSTRAINT serial_czlowiek_kina_fk FOREIGN KEY ( czlowiek_kina_id )
        REFERENCES czlowiek_kina ( id );

ALTER TABLE sezon
    ADD CONSTRAINT sezon_serial_fk FOREIGN KEY ( serial_id )
        REFERENCES serial ( id );

-- uprawnienia
grant select, insert, update, delete, truncate on uzytkownik, uprawnienie, sezon, serial, rola, gatunki_filmow, uprawnienia_rang, ranga, odcinek, ocena, gatunek, film, czlowiek_kina to filmbookapi_user;
grant create on schema public to filmbookapi_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO filmbookapi_user;