CREATE TABLE user_role (
	role_id SERIAL PRIMARY KEY,
	role_type TEXT UNIQUE NOT NULL
);
CREATE TABLE app_user (
	user_id SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	user_password TEXT NOT NULL,
	first_name TEXT NOT NULL,
	last_name TEXT NOT NULL,
	email TEXT NOT NULL,
	role_id INTEGER REFERENCES user_role(role_id)
);
CREATE TABLE reimbursement_status (
	status_id SERIAL PRIMARY KEY,
	status_name TEXT UNIQUE NOT NULL
);
CREATE TABLE reimbursement_type (
	type_id SERIAL PRIMARY KEY,
	type_name TEXT UNIQUE NOT NULL
);
CREATE TABLE reimbursement (
	reimbursement_id SERIAL PRIMARY KEY,
	author_id INTEGER NOT NULL REFERENCES app_user(user_id),
	amount NUMERIC(100,2) NOT NULL,
	date_submitted NUMERIC(14,0) NOT NULL,
	date_resolved NUMERIC(14,0),
	description TEXT NOT NULL,
	resolver INTEGER REFERENCES app_user(user_id),
	status_id INTEGER REFERENCES reimbursement_status(status_id),
	type_id INTEGER REFERENCES reimbursement_type(type_id)
);