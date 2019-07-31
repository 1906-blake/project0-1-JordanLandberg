import User from "./user";
import reimbursementStatus from "./reimbursement-status";
import reimbursementType from "./reimbursement-type";

export default class Reimbursement {
    constructor(
        public reimbursementId = 0,
        public author = new User,
        public amount = 0,
        public dateSubmitted = 0,
        public dateResolved = 0,
        public description = '',
        public resolver = new User,
        public status = new reimbursementStatus,
        public type = new reimbursementType
    ) { }
}