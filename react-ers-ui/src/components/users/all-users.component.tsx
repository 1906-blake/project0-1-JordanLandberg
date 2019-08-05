import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import User from '../../models/user';

interface IState {
    users: User[]
}

export default class AllUsersComponent extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const resp = await fetch('http://localhost:8012/users', {
            credentials: 'include'
        });
        const users = await resp.json();
        this.setState({
            users
        });
    }

    render() {
        const users = this.state.users;
        return (
            <div className="reimbursement-table-container select-users">
                <h2>All Users</h2>
                <Link to="/users/id">
                    <button className="btn btn-secondary btn-lg btn-info btn-custom">View a User By User ID</button>
                </Link>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">User ID #</th>
                            <th scope="col">Username</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        users.map(users =>
                            <tr key={'userId-'+users.userId}>
                                <td>{users.userId}</td>
                                <td>{users.username}</td>
                                <td>{users.firstName}</td>
                                <td>{users.lastName}</td>
                                <td>{users.email}</td>
                                <td>{users.role && users.role.role}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
