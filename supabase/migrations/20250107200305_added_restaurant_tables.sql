create table "public"."dish_categories" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text,
    "restaurant_id" uuid
);


alter table "public"."dish_categories" enable row level security;

create table "public"."dishes" (
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


alter table "public"."dishes" enable row level security;

create table "public"."restaurants" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "business_name" text,
    "business_address" text,
    "business_phone_number" text,
    "business_email_address" text
);


alter table "public"."restaurants" enable row level security;

CREATE UNIQUE INDEX dish_categories_pkey ON public.dish_categories USING btree (id);

CREATE UNIQUE INDEX dishes_pkey ON public.dishes USING btree (id);

CREATE UNIQUE INDEX restaurants_pkey ON public.restaurants USING btree (id);

alter table "public"."dish_categories" add constraint "dish_categories_pkey" PRIMARY KEY using index "dish_categories_pkey";

alter table "public"."dishes" add constraint "dishes_pkey" PRIMARY KEY using index "dishes_pkey";

alter table "public"."restaurants" add constraint "restaurants_pkey" PRIMARY KEY using index "restaurants_pkey";

alter table "public"."dish_categories" add constraint "dish_categories_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE not valid;

alter table "public"."dish_categories" validate constraint "dish_categories_restaurant_id_fkey";

alter table "public"."dishes" add constraint "dishes_dish_category_id_fkey" FOREIGN KEY (dish_category_id) REFERENCES dish_categories(id) not valid;

alter table "public"."dishes" validate constraint "dishes_dish_category_id_fkey";

alter table "public"."dishes" add constraint "dishes_restaurant_id_fkey" FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE not valid;

alter table "public"."dishes" validate constraint "dishes_restaurant_id_fkey";

grant delete on table "public"."dish_categories" to "anon";

grant insert on table "public"."dish_categories" to "anon";

grant references on table "public"."dish_categories" to "anon";

grant select on table "public"."dish_categories" to "anon";

grant trigger on table "public"."dish_categories" to "anon";

grant truncate on table "public"."dish_categories" to "anon";

grant update on table "public"."dish_categories" to "anon";

grant delete on table "public"."dish_categories" to "authenticated";

grant insert on table "public"."dish_categories" to "authenticated";

grant references on table "public"."dish_categories" to "authenticated";

grant select on table "public"."dish_categories" to "authenticated";

grant trigger on table "public"."dish_categories" to "authenticated";

grant truncate on table "public"."dish_categories" to "authenticated";

grant update on table "public"."dish_categories" to "authenticated";

grant delete on table "public"."dish_categories" to "service_role";

grant insert on table "public"."dish_categories" to "service_role";

grant references on table "public"."dish_categories" to "service_role";

grant select on table "public"."dish_categories" to "service_role";

grant trigger on table "public"."dish_categories" to "service_role";

grant truncate on table "public"."dish_categories" to "service_role";

grant update on table "public"."dish_categories" to "service_role";

grant delete on table "public"."dishes" to "anon";

grant insert on table "public"."dishes" to "anon";

grant references on table "public"."dishes" to "anon";

grant select on table "public"."dishes" to "anon";

grant trigger on table "public"."dishes" to "anon";

grant truncate on table "public"."dishes" to "anon";

grant update on table "public"."dishes" to "anon";

grant delete on table "public"."dishes" to "authenticated";

grant insert on table "public"."dishes" to "authenticated";

grant references on table "public"."dishes" to "authenticated";

grant select on table "public"."dishes" to "authenticated";

grant trigger on table "public"."dishes" to "authenticated";

grant truncate on table "public"."dishes" to "authenticated";

grant update on table "public"."dishes" to "authenticated";

grant delete on table "public"."dishes" to "service_role";

grant insert on table "public"."dishes" to "service_role";

grant references on table "public"."dishes" to "service_role";

grant select on table "public"."dishes" to "service_role";

grant trigger on table "public"."dishes" to "service_role";

grant truncate on table "public"."dishes" to "service_role";

grant update on table "public"."dishes" to "service_role";

grant delete on table "public"."restaurants" to "anon";

grant insert on table "public"."restaurants" to "anon";

grant references on table "public"."restaurants" to "anon";

grant select on table "public"."restaurants" to "anon";

grant trigger on table "public"."restaurants" to "anon";

grant truncate on table "public"."restaurants" to "anon";

grant update on table "public"."restaurants" to "anon";

grant delete on table "public"."restaurants" to "authenticated";

grant insert on table "public"."restaurants" to "authenticated";

grant references on table "public"."restaurants" to "authenticated";

grant select on table "public"."restaurants" to "authenticated";

grant trigger on table "public"."restaurants" to "authenticated";

grant truncate on table "public"."restaurants" to "authenticated";

grant update on table "public"."restaurants" to "authenticated";

grant delete on table "public"."restaurants" to "service_role";

grant insert on table "public"."restaurants" to "service_role";

grant references on table "public"."restaurants" to "service_role";

grant select on table "public"."restaurants" to "service_role";

grant trigger on table "public"."restaurants" to "service_role";

grant truncate on table "public"."restaurants" to "service_role";

grant update on table "public"."restaurants" to "service_role";

create policy "Enable all actions"
on "public"."dish_categories"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable all actions"
on "public"."dishes"
as permissive
for all
to public
using (true)
with check (true);


create policy "Enable all actions"
on "public"."restaurants"
as permissive
for all
to public
using (true)
with check (true);




