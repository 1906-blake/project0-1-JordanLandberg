import Reimbursement from "../models/reimbursement";
import ReimbursementStatus from "../models/reimbursement-status";
import ReimbursementType from "../models/reimbursement-type";
import User from "../models/user";
import Role from "../models/role";

export function convertSqlReimbursements(row: any): Reimbursement {
    return new Reimbursement(row.reimbursement_id, new User(row.author_id, row.username, '', row.first_name, row.last_name, row.email, new Role(row.role_id, row.role_type)), row.amount, row.date_submitted, row.date_resolved, row.description, row.resolver, new ReimbursementStatus(row.status_id, row.status_name), new ReimbursementType(row.type_id, row.type_name));
}