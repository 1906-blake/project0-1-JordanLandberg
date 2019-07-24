INSERT INTO reimbursement_type (type_name) VALUES
	('Lodging'),
	('Travel'),
	('Food'),
	('Other');

INSERT INTO reimbursement_status (status_name) VALUES
	('Pending'),
	('Approved'),
	('Denied');

INSERT INTO user_role (role_type) VALUES
	('admin'),
	('finance-manager'),
	('employee');

INSERT INTO app_user (username, user_password, first_name, last_name, email, role_id) VALUES
	('jordanlandberg', 'password', 'jordan', 'landberg', 'jordanlandberg@gmail.com', 1),
	('btkruppa', 'pass', 'blake', 'kruppa','blake.kruppa@revature.com', 2),
	('alandberg', 'jordan71197', 'allison', 'landberg','alandberg@winstonretial.com', 3),
	('steamboatwillie','minnie4life','mickey','mouse','mm@waltdisneyworld.com', 1),
	('nygfan','champion', 'pat', 'shurmur', 'pshurmur@giants.com', 3);
	
INSERT INTO reimbursement (author_id, amount, date_submitted, date_resolved, description, resolver, status_id, type_id) VALUES
	(2, 250, 1563565001796, null, 'random description 1', null, 1, 1),
	(1, 1345, 1563565020738, null, 'random description 2', null, 1, 3),
	(1, 11273, 1563565041531, null, 'random description 3', 1, 2, 1),
	(3,250, 1563564021753, null, 'random description 4', 1, 2, 4),
	(5,250, 1563564051732, null, 'random description 5', 1, 3, 2);