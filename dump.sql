--
-- PostgreSQL database dump
--

-- Dumped from database version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.4 (Ubuntu 14.4-0ubuntu0.22.04.1)

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
-- Name: urls; Type: TABLE; Schema: public; Owner: milene
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    url text NOT NULL,
    "shortUrl" text NOT NULL,
    "visitCount" integer NOT NULL,
    "userId" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.urls OWNER TO milene;

--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: milene
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.urls_id_seq OWNER TO milene;

--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: milene
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: milene
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO milene;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: milene
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO milene;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: milene
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: milene
--

COPY public.urls (id, url, "shortUrl", "visitCount", "userId", "createdAt") FROM stdin;
4	https://www.youtube.com/watch?v=mZyPaA9uw1I	dd1_kmIoq_mI7PQ6Msrlr	2	1	2022-08-04 14:47:33.390821
5	https://www.netflix.com/browse	r2fm4wyIDRhGEqNfIJ9_0	1	1	2022-08-05 21:29:44.265727
6	https://mail.google.com/mail/u/0/#inbox	PDzcN-gabJWjfoIiz4txB	1	3	2022-08-05 22:22:12.201707
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: milene
--

COPY public.users (id, name, email, password, "createdAt") FROM stdin;
1	Maria	maria@mail.com	$2b$10$xAv8ZH2X0Fygo1ugx44/o.55P1/WMxI9ZGuFgmBbutLv0hIksHODO	2022-08-04 14:13:36.501713
2	Joao	joao@mail.com	$2b$10$hPw/Q4udjKxy5lFpRUneVe.WgEG0gFazyhXrEImL49/RWImHPf6au	2022-08-05 22:09:12.184598
3	Joaozin	joaozin@mail.com	$2b$10$zzGmSkZgU3qH9K12mQbFMOfJsCOf.xUBE45B7yjC/xOJTflFFLXee	2022-08-05 22:09:26.875903
4	Joana	joana@mail.com	$2b$10$YynY.JqcRxm5VbTBiEo0COVq8zAFMYARIRNq1KMevVaUmo0ZDSK66	2022-08-05 22:09:38.697584
5	Joanas	joanas@mail.com	$2b$10$UuXYP8s0VsVgEp52MxSH0OJ0BJw4Cnt..NVaKUrmNE4ESeVeWfDg2	2022-08-05 22:25:04.32097
6	Jonas	jonas@mail.com	$2b$10$oQtM0Oj3eSAEJg1WR8TLhumv2v.XgkGBWiqbIyxvpxBMqBwaABaQS	2022-08-05 22:25:11.757218
7	Jose	jose@mail.com	$2b$10$65Cpjg5WTHwIrPaEnZPB.eFMBiePuZ4lVCPkwScI.gjG3MkOxEZO.	2022-08-05 22:25:26.108405
8	Josefina	josefina@mail.com	$2b$10$sJHQHFo5W67KqPGGaFUDWu9TVq83Obz3XxkoYHsRIci1YZ/0N6q26	2022-08-05 22:25:35.96716
9	Jesofina	jesofina@mail.com	$2b$10$r6XsTW4og2E6k2wQVuqHLuL4mXKsRI.IpbgkktQ0a7aBXL7ta/Fu.	2022-08-05 22:25:47.202532
10	Zulma	zulma@mail.com	$2b$10$MKfFU8uVwss50ChcFwD47.A.0ppGJpedfggFGUVvU93EX4OenK1P.	2022-08-05 22:26:37.982934
11	Zuleide	zuleide@mail.com	$2b$10$7ZMU9d1C0C8DpSy3jYOnIuSpaRXW2bomBI7MUqh764lkjWNqExhy2	2022-08-05 22:26:45.570975
\.


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: milene
--

SELECT pg_catalog.setval('public.urls_id_seq', 6, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: milene
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls urls_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: milene
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

