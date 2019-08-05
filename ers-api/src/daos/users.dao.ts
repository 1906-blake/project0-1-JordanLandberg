import User from "../models/user";
import { PoolClient } from "pg";
import { connectionPool } from "../util/connection.util";
import { convertSqlUser } from "../util/user.converter";

export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT * FROM app_user JOIN user_role USING (role_id)
                WHERE username = $1 AND user_password = $2
        `
        const result = await client.query(queryString, [username, password]);
        const sqlUser = result.rows[0];
        return sqlUser && convertSqlUser(sqlUser);
    } catch (err) {
        console.log(err)
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findAll(): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM app_user JOIN user_role USING (role_id) ORDER BY user_id`
        const result = await client.query(queryString);
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err)
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findById(id: number): Promise<User[]> {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        SELECT * FROM app_user LEFT JOIN user_role USING (role_id)
            WHERE user_id = $1
        `
        const result = await client.query(queryString, [id]);
        return result.rows.map(convertSqlUser);
    } catch (err) {
        console.log(err)
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function updateUser(user: User): Promise<User> {
    const oldUser = await findById(user.userId);
    if (!oldUser[0]) {
        return undefined;
    }
    user = {
        ...oldUser[0],
        ...user
    };
    console.log('testing123');
    console.log('testing123');
    console.log('testing123');
    console.log(user);
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `
        UPDATE app_user SET 
            username = $1,
            user_password = $2,
            first_name = $3,
            last_name = $4,
            email = $5,
            role_id = $6
        WHERE user_id = $7
        `
        const constraints = [user.username, user.password, user.firstName, user.lastName, user.email, user.role.roleId, user.userId]
        await client.query(queryString, constraints);
        return user;
    } catch (err) {
        console.log(err)
    } finally {
        client && client.release();
    }
    return undefined;
}
