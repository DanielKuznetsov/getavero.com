drop policy "Enable all actions" on "public"."dishes";

revoke delete on table "public"."dishes" from "anon";

revoke insert on table "public"."dishes" from "anon";

revoke references on table "public"."dishes" from "anon";

revoke select on table "public"."dishes" from "anon";

revoke trigger on table "public"."dishes" from "anon";

revoke truncate on table "public"."dishes" from "anon";

revoke update on table "public"."dishes" from "anon";

revoke delete on table "public"."dishes" from "authenticated";

revoke insert on table "public"."dishes" from "authenticated";

revoke references on table "public"."dishes" from "authenticated";

revoke select on table "public"."dishes" from "authenticated";

revoke trigger on table "public"."dishes" from "authenticated";

revoke truncate on table "public"."dishes" from "authenticated";

revoke update on table "public"."dishes" from "authenticated";

revoke delete on table "public"."dishes" from "service_role";

revoke insert on table "public"."dishes" from "service_role";

revoke references on table "public"."dishes" from "service_role";

revoke select on table "public"."dishes" from "service_role";

revoke trigger on table "public"."dishes" from "service_role";

revoke truncate on table "public"."dishes" from "service_role";

revoke update on table "public"."dishes" from "service_role";

alter table "public"."dishes" drop constraint "dishes_dish_category_id_fkey";

alter table "public"."dishes" drop constraint "dishes_restaurant_id_fkey";

alter table "public"."dishes" drop constraint "dishes_pkey";

drop index if exists "public"."dishes_pkey";

drop table "public"."dishes";

create table "public"."menu_items" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "choose_option" json,
    "choose_topping" json,
    "add_toppings" json,
    "choose_salad" json,
    "choose_pasta" json,
    "add_extra" json,
    "remove_toppings" json,
    "general_pizza_mod" json,
    "salad_toppings_mod" json,
    "choose_soda" json,
    "restaurant_id" uuid,
    "dish_category_id" uuid
);


alter table "public"."menu_items" enable row level security;

CREATE UNIQUE INDEX dishes_pkey ON public.menu_items USING btree (id);

alter table "public"."menu_items" add constraint "dishes_pkey" PRIMARY KEY using index "dishes_pkey";

alter table "public"."menu_items" add constraint "dishes_dish_category_id_fkey" FOREIGN KEY (dish_category_id) REFERENCES dish_categories(id) not valid;

alter table "public"."menu_items" validate constraint "dishes_dish_category_id_fkey";

alter table "public"."menu_items" add constraint "dishes_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE not valid;

alter table "public"."menu_items" validate constraint "dishes_restaurant_id_fkey";

grant delete on table "public"."menu_items" to "anon";

grant insert on table "public"."menu_items" to "anon";

grant references on table "public"."menu_items" to "anon";

grant select on table "public"."menu_items" to "anon";

grant trigger on table "public"."menu_items" to "anon";

grant truncate on table "public"."menu_items" to "anon";

grant update on table "public"."menu_items" to "anon";

grant delete on table "public"."menu_items" to "authenticated";

grant insert on table "public"."menu_items" to "authenticated";

grant references on table "public"."menu_items" to "authenticated";

grant select on table "public"."menu_items" to "authenticated";

grant trigger on table "public"."menu_items" to "authenticated";

grant truncate on table "public"."menu_items" to "authenticated";

grant update on table "public"."menu_items" to "authenticated";

grant delete on table "public"."menu_items" to "service_role";

grant insert on table "public"."menu_items" to "service_role";

grant references on table "public"."menu_items" to "service_role";

grant select on table "public"."menu_items" to "service_role";

grant trigger on table "public"."menu_items" to "service_role";

grant truncate on table "public"."menu_items" to "service_role";

grant update on table "public"."menu_items" to "service_role";

create policy "Enable all actions"
on "public"."menu_items"
as permissive
for all
to public
using (true)
with check (true);




