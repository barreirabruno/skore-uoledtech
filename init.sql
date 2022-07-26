create table pg_content_resource (
	id serial primary key,
	published int,
	name varchar(255),
	description varchar(255),
	type varchar(15),
	created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
	updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);