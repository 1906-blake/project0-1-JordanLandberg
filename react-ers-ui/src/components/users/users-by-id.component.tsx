import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import User from '../../models/user';

interface IState {
    users: User[],
    userId: number,
    loggedInUser?: User
}

export default class UsersByUserIdComponent extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            userId: 0
        };
    }

    componentDidMount() {
        const loggedInUserString = localStorage.getItem('user');
        const loggedInUser = loggedInUserString && JSON.parse(loggedInUserString);
        this.setState({
            loggedInUser
        })
    
    }

    usersByUserId = async () => {
        const resp = await fetch(`http://localhost:8012/users/${this.state.userId}`, {
            credentials: 'include'
        });
        const users = await resp.json();
        
        this.setState({
            users
        });
    }

    updateUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userId: +event.target.value
        });
    }

    render() {
        const users = this.state.users;
        return (
            <div className="reimbursement-table-container select-users">
                <h2>Users by User Id</h2>
                <Link to="/users/all">
                    <button className="btn btn-secondary btn-lg btn-info btn-custom">View All Users</button>
                </Link>
                <br/>
                <span>User ID: </span>
                <input typeof="number" className="form-control"
                    placeholder="number" value={this.state.userId}
                    onChange={this.updateUser} required />
                <button className="btn btn-success" onClick={this.usersByUserId}>Submit</button>

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
