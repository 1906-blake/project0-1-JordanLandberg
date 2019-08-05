import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class UsersComponent extends Component {

    render() {
        return (
            <div className="select-users">
                <div>
                    <h2>Welcome to Users</h2>
                    <h4>Would you like to:</h4>
                    <Link to="/users/all">
                        <button className="btn btn-secondary btn-lg btn-info btn-custom">View All Users</button>
                    </Link>
                    <Link to="/users/id">
                        <button className="btn btn-secondary btn-lg btn-info btn-custom">View a User By User ID</button>
                    </Link>
                </div>
                {/* <UserTableAll/>
                <UserTableById/>
                <UserTableUpdate/> */}
            </div>
        )
    }
}
