--
-- PostgreSQL database dump
--

-- Dumped from database version 14.0
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS bahnplan;
--
-- Name: bahnplan; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE bahnplan WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_Germany.1252';


ALTER DATABASE bahnplan OWNER TO postgres;

\connect bahnplan

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bahnhof; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bahnhof (
    kuerzel character varying(5) NOT NULL,
    name character varying(100),
    standort character varying(200)
);


ALTER TABLE public.bahnhof OWNER TO postgres;

--
-- Name: fahrt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fahrt (
    id integer NOT NULL,
    fk_bahnhofab character varying(5) NOT NULL,
    fk_bahnhofzu character varying(5) NOT NULL,
    abfahrt_zeit time without time zone,
    ankunft_zeit time without time zone
);


ALTER TABLE public.fahrt OWNER TO postgres;

--
-- Name: fahrt_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fahrt_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fahrt_id_seq OWNER TO postgres;

--
-- Name: fahrt_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fahrt_id_seq OWNED BY public.fahrt.id;


--
-- Name: zug; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zug (
    name character varying(20) NOT NULL,
    barrierefrei boolean NOT NULL,
    plaetze integer,
    beschreibung text
);


ALTER TABLE public.zug OWNER TO postgres;

--
-- Name: zug_fahrt; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.zug_fahrt (
    fk_id integer,
    fk_name character varying(20)
);


ALTER TABLE public.zug_fahrt OWNER TO postgres;

--
-- Name: fahrt id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fahrt ALTER COLUMN id SET DEFAULT nextval('public.fahrt_id_seq'::regclass);


--
-- Data for Name: bahnhof; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bahnhof (kuerzel, name, standort) FROM stdin;
QOISQ	Kings	Bang Kruai
JJDIJ	Magdeline	Port-aux-Français
CJLPE	Talisman	Gaza
NWKFP	Meadow Ridge	Al Qubbah
YZSHR	Amoth	San Antonio
VVQON	Blaine	Faraulep
FVVRH	Artisan	Lizi
XUSRM	Declaration	Guacarí
XMTRE	Carey	Fuli
YSMKY	Mccormick	Santa Luzia
\.


--
-- Data for Name: fahrt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fahrt (id, fk_bahnhofab,fk_bahnhofzu, abfahrt_zeit, ankunft_zeit) FROM stdin;
1	QOISQ	JJDIJ  	11:38:00	13:49:00
2	QOISQ	CJLPE	15:18:00	13:51:00
3	JJDIJ	CJLPE	03:10:00	04:29:00
4	JJDIJ	NWKFP	06:54:00	23:55:00
5	JJDIJ	YSMKY	01:09:00	14:25:00
6	CJLPE	XMTRE	07:54:00	03:07:00
7	CJLPE	XUSRM	09:02:00	20:59:00
8	NWKFP	XUSRM	22:24:00	22:53:00
9	NWKFP	FVVRH	21:09:00	18:37:00
10	YZSHR	QOISQ	21:44:00	08:10:00
\.


--
-- Data for Name: zug; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zug (name, barrierefrei, plaetze, beschreibung) FROM stdin;
S68	f	6690	\N
S81	f	9723	\N
S33	f	3155	\N
S19	f	1029	\N
S60	t	2381	\N
S41	f	5939	\N
S28	t	2883	\N
S16	f	4308	\N
S93	f	3352	\N
S12	f	1937	\N
\.


--
-- Data for Name: zug_fahrt; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.zug_fahrt (fk_id, fk_name) FROM stdin;
\.


--
-- Name: fahrt_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fahrt_id_seq', 1, false);


--
-- Name: bahnhof bahnhof_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bahnhof
    ADD CONSTRAINT bahnhof_pkey PRIMARY KEY (kuerzel);


--
-- Name: fahrt fahrt_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fahrt
    ADD CONSTRAINT fahrt_pkey PRIMARY KEY (id);


--
-- Name: zug zug_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zug
    ADD CONSTRAINT zug_pkey PRIMARY KEY (name);


--
-- Name: fahrt fahrt_fk_bahnhofab_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fahrt
    ADD CONSTRAINT fahrt_fk_bahnhofab_fkey FOREIGN KEY (fk_bahnhofab) REFERENCES public.bahnhof(kuerzel);

--
-- Name: fahrt fahrt_fk_bahnhofzu_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fahrt
    ADD CONSTRAINT fahrt_fk_bahnhofzu_fkey FOREIGN KEY (fk_bahnhofzu) REFERENCES public.bahnhof(kuerzel);


--
-- Name: zug_fahrt zug_fahrt_fk_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zug_fahrt
    ADD CONSTRAINT zug_fahrt_fk_id_fkey FOREIGN KEY (fk_id) REFERENCES public.fahrt(id);


--
-- Name: zug_fahrt zug_fahrt_fk_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.zug_fahrt
    ADD CONSTRAINT zug_fahrt_fk_name_fkey FOREIGN KEY (fk_name) REFERENCES public.zug(name);


--
-- PostgreSQL database dump complete
--

