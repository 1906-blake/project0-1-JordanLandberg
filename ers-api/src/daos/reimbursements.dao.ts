import { PoolClient } from "pg";
import { convertSqlReimbursements } from "../util/reimbursement.converter";
import { connectionPool } from "../util/connection.util";
import Reimbursement from "../models/reimbursement";

export async function findReimbursementByStatusId(statusId: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status_name, rt.type_name, author.username as author_username, author.user_password as author_password, author.first_name as author_first_name, author.last_name as author_last_name, author.email as author_email, author.role_id as author_role_id, ar.role_type as author_role_type,
        resolver.username as resolver_username, resolver.user_password as resolver_password, resolver.first_name as resolver_first_name, resolver.last_name as resolver_last_name, resolver.email as resolver_email, resolver.role_id as resolver_role_id, rr.role_type as resolver_role_type
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs USING (status_id) 
            LEFT JOIN reimbursement_type rt USING (type_id)
            LEFT JOIN app_user author ON (author_id = author.user_id)
            LEFT JOIN user_role ar ON (author.role_id = ar.role_id)
            LEFT JOIN app_user resolver ON (resolver = resolver.user_id)
            LEFT JOIN user_role rr ON (resolver.role_id = rr.role_id)
            WHERE status_id = $1
        `
        const result = await client.query(queryString, [statusId]);
        return result.rows.map(convertSqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findAllReimbursement(): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status_name, rt.type_name, author.username as author_username, author.user_password as author_password, author.first_name as author_first_name, author.last_name as author_last_name, author.email as author_email, author.role_id as author_role_id, ar.role_type as author_role_type,
        resolver.username as resolver_username, resolver.user_password as resolver_password, resolver.first_name as resolver_first_name, resolver.last_name as resolver_last_name, resolver.email as resolver_email, resolver.role_id as resolver_role_id, rr.role_type as resolver_role_type
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs USING (status_id) 
            LEFT JOIN reimbursement_type rt USING (type_id)
            LEFT JOIN app_user author ON (author_id = author.user_id)
            LEFT JOIN user_role ar ON (author.role_id = ar.role_id)
            LEFT JOIN app_user resolver ON (resolver = resolver.user_id)
            LEFT JOIN user_role rr ON (resolver.role_id = rr.role_id)
        `
        const result = await client.query(queryString);
        return result.rows.map(convertSqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementByAuthorId(userId: number): Promise<Reimbursement[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status_name, rt.type_name, author.username as author_username, author.user_password as author_password, author.first_name as author_first_name, author.last_name as author_last_name, author.email as author_email, author.role_id as author_role_id, ar.role_type as author_role_type,
        resolver.username as resolver_username, resolver.user_password as resolver_password, resolver.first_name as resolver_first_name, resolver.last_name as resolver_last_name, resolver.email as resolver_email, resolver.role_id as resolver_role_id, rr.role_type as resolver_role_type
        FROM reimbursement r
            LEFT JOIN reimbursement_status rs USING (status_id) 
            LEFT JOIN reimbursement_type rt USING (type_id)
            LEFT JOIN app_user author ON (author_id = author.user_id)
            LEFT JOIN user_role ar ON (author.role_id = ar.role_id)
            LEFT JOIN app_user resolver ON (resolver = resolver.user_id)
            LEFT JOIN user_role rr ON (resolver.role_id = rr.role_id)
            WHERE author_id = $1
        `
        const result = await client.query(queryString, [userId]);
        return result.rows.map(convertSqlReimbursements);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findReimbursementById(userId: number): Promise<Reimbursement> {
    let client: PoolClient;
    try {
        console.log(userId);
        client = await connectionPool.connect();
        const queryString = `
        SELECT r.*, rs.status_name, rt.type_name, author.username as author_username, author.user_password as author_password, author.first_name as author_first_name, author.last_name as author_last_name, author.email as author_email, author.role_id as author_role_id, ar.role_type as author_role_type,
			resolver.username as resolver_username, resolver.user_password as resolver_password, resolver.first_name as resolver_first_name, resolver.last_name as resolver_last_name, resolver.email as resolver_email, resolver.role_id as resolver_role_id, rr.role_type as resolver_role_type
            FROM reimbursement r
                LEFT JOIN reimbursement_status rs USING (status_id) 
                LEFT JOIN reimbursement_type rt USING (type_id)
                LEFT JOIN app_user author ON (author_id = author.user_id)
                LEFT JOIN user_role ar ON (author.role_id = ar.role_id)
				LEFT JOIN app_user resolver ON (resolver = resolver.user_id)
                LEFT JOIN user_role rr ON (resolver.role_id = rr.role_id)
            WHERE reimbursement_id = $1
        `
        const result = await client.query(queryString, [userId]);
        const reimbursement = result.rows[0];
        console.log(reimbursement);
        return convertSqlReimbursements(reimbursement);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function createReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        let queryString = `
        INSERT INTO reimbursement (author_id, amount, date_submitted, date_resolved, description, resolver, status_id, type_id)
        VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING reimbursement_id
        `
        const input = [
            reimbursement.author.userId,
            reimbursement.amount,
            reimbursement.dateSubmitted,
            reimbursement.dateResolved,
            reimbursement.description,
            reimbursement.resolver && reimbursement.resolver.userId,
            reimbursement.status.statusId,
            reimbursement.type.typeId
        ]
        const newId = await client.query(queryString, input);
        const id = newId.rows[0].reimbursement_id;
        const result = await findReimbursementById(id);
        return result;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function updateReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
    const oldReimbursement = await findReimbursementById(reimbursement.reimbursementId);
    if (!oldReimbursement) {
        return undefined;
    }
    reimbursement = {
        ...oldReimbursement,
        ...reimbursement
    };
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        UPDATE reimbursement SET 
        author_id = $1,
        amount = $2,
        date_submitted = $3,
        date_resolved = $4,
        description = $5,
        resolver = $6,
        status_id = $7,
        type_id = $8
        WHERE reimbursement_id = $9
        `
        const constraints = [reimbursement.author.userId, reimbursement.amount, reimbursement.dateSubmitted, reimbursement.dateResolved, reimbursement.description, reimbursement.resolver && reimbursement.resolver.userId, reimbursement.status.statusId, reimbursement.type.typeId, reimbursement.reimbursementId];
        await client.query(queryString, constraints);
        const newReimbursement = await findReimbursementById(reimbursement.reimbursementId);
        return newReimbursement;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}