--
-- PostgreSQL database dump
--

-- Dumped from database version 15.2 (Debian 15.2-1.pgdg110+1)
-- Dumped by pg_dump version 15.1

-- Started on 2023-09-11 22:35:09

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

--
-- TOC entry 2 (class 3079 OID 24979)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 884 (class 1247 OID 25030)
-- Name: PaymentType; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."PaymentType" AS ENUM (
    'CASH',
    'CARD',
    'E_WALLET'
);


--
-- TOC entry 914 (class 1247 OID 57487)
-- Name: RideStatus; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."RideStatus" AS ENUM (
    'BOOKED',
    'FINDING_DRIVER',
    'WAITING_DRIVER',
    'DRIVER_AT_PICKUP',
    'TRIP_IS_GOING',
    'DRIVER_AT_DROP',
    'CANT_FIND_DRIVER',
    'DRIVER_CANCELED',
    'CLIENT_CANCELED'
);


--
-- TOC entry 881 (class 1247 OID 25017)
-- Name: StaffRole; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."StaffRole" AS ENUM (
    'ADMIN',
    'EMPLOYEE'
);


--
-- TOC entry 908 (class 1247 OID 49295)
-- Name: Weather; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public."Weather" AS ENUM (
    'SUNNY',
    'WINDY',
    'RAINY'
);


SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 25055)
-- Name: driver; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.driver (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    phone character varying(20) NOT NULL,
    name text NOT NULL,
    rating real DEFAULT 5 NOT NULL,
    email text
);


--
-- TOC entry 222 (class 1259 OID 49301)
-- Name: pricing_factor; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pricing_factor (
    x_distance double precision DEFAULT 1 NOT NULL,
    x_estimated_time double precision DEFAULT 1 NOT NULL,
    weather public."Weather" NOT NULL,
    x_4seats double precision DEFAULT 1 NOT NULL,
    x_7seats double precision DEFAULT 1 NOT NULL,
    x_motorcycle double precision DEFAULT 1 NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 32910)
-- Name: rating; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.rating (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    ride_id uuid NOT NULL,
    driver_rating double precision DEFAULT 5 NOT NULL,
    user_rating double precision DEFAULT 5 NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 25080)
-- Name: ride; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ride (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    fee numeric(65,30) NOT NULL,
    payment_type public."PaymentType" NOT NULL,
    book_time timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    arrive_time timestamp(3) without time zone,
    status public."RideStatus" DEFAULT 'BOOKED'::public."RideStatus" NOT NULL,
    user_id uuid NOT NULL,
    driver_id uuid,
    vehicle_id uuid,
    end_lat double precision NOT NULL,
    end_lon double precision NOT NULL,
    end_name text NOT NULL,
    start_lat double precision NOT NULL,
    start_lon double precision NOT NULL,
    start_name text NOT NULL
);


--
-- TOC entry 218 (class 1259 OID 25064)
-- Name: staff; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.staff (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text,
    role public."StaffRole" NOT NULL,
    name text NOT NULL
);


--
-- TOC entry 215 (class 1259 OID 25037)
-- Name: user; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."user" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text,
    phone character varying(20) NOT NULL,
    name text NOT NULL,
    is_vip boolean DEFAULT false NOT NULL,
    rating real DEFAULT 5 NOT NULL
);


--
-- TOC entry 216 (class 1259 OID 25047)
-- Name: user_saved_place; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_saved_place (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    saved_name text NOT NULL,
    google_place_id text NOT NULL,
    place_name text NOT NULL,
    user_id uuid NOT NULL
);


--
-- TOC entry 219 (class 1259 OID 25072)
-- Name: vehicle; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vehicle (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    plate_number character varying(10) NOT NULL,
    model text NOT NULL,
    color text,
    type text,
    driver_id uuid NOT NULL
);


--
-- TOC entry 3278 (class 2606 OID 25063)
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- TOC entry 3290 (class 2606 OID 49310)
-- Name: pricing_factor pricing_factor_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pricing_factor
    ADD CONSTRAINT pricing_factor_pkey PRIMARY KEY (weather);


--
-- TOC entry 3287 (class 2606 OID 32918)
-- Name: rating rating_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_pkey PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 25088)
-- Name: ride ride_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_pkey PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 25071)
-- Name: staff staff_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.staff
    ADD CONSTRAINT staff_pkey PRIMARY KEY (id);


--
-- TOC entry 3273 (class 2606 OID 25046)
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 3275 (class 2606 OID 25054)
-- Name: user_saved_place user_saved_place_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_saved_place
    ADD CONSTRAINT user_saved_place_pkey PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 25079)
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);


--
-- TOC entry 3276 (class 1259 OID 41116)
-- Name: driver_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX driver_email_key ON public.driver USING btree (email);


--
-- TOC entry 3288 (class 1259 OID 32919)
-- Name: rating_ride_id_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX rating_ride_id_key ON public.rating USING btree (ride_id);


--
-- TOC entry 3279 (class 1259 OID 41117)
-- Name: staff_email_key; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX staff_email_key ON public.staff USING btree (email);


--
-- TOC entry 3271 (class 1259 OID 41118)
-- Name: user_email_key; Type: INDEX; Schema: public; Owner: -
--

-- CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);


--
-- TOC entry 3296 (class 2606 OID 41144)
-- Name: rating rating_ride_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.rating
    ADD CONSTRAINT rating_ride_id_fkey FOREIGN KEY (ride_id) REFERENCES public.ride(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3293 (class 2606 OID 57512)
-- Name: ride ride_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.driver(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3294 (class 2606 OID 41129)
-- Name: ride ride_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3295 (class 2606 OID 57517)
-- Name: ride ride_vehicle_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ride
    ADD CONSTRAINT ride_vehicle_id_fkey FOREIGN KEY (vehicle_id) REFERENCES public.vehicle(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3291 (class 2606 OID 41119)
-- Name: user_saved_place user_saved_place_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_saved_place
    ADD CONSTRAINT user_saved_place_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 3292 (class 2606 OID 41124)
-- Name: vehicle vehicle_driver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_driver_id_fkey FOREIGN KEY (driver_id) REFERENCES public.driver(id) ON UPDATE CASCADE ON DELETE RESTRICT;


-- Completed on 2023-09-11 22:35:09

--
-- PostgreSQL database dump complete
--

