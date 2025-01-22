alter table "public"."menu_items" add column "description" text;

alter table "public"."orders" add column "order_status" text default 'Pending'::text;



