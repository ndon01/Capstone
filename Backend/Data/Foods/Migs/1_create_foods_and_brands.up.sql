create table foods (
    id serial primary key,
    name varchar(255) not null,

    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

create table brands (
    id serial primary key,
    name varchar(255) not null,

    created_at timestamp not null default now(),
    updated_at timestamp not null default now()
);

alter table foods add column brand_id integer references brands(id);



