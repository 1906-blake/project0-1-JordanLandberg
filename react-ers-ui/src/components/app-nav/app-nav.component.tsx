import React from 'react';
import { Link } from 'react-router-dom';


export class NavComponent extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
                <div className="c-pointer shift-left active">
                    <ul className="navbar-nav ml-auto margin-nav">
                        <li className="nav-item" id="dashboard">
                            <h3><Link to="/dashboard" className="unset-anchor nav-link">Expense Reimbursement System</Link></h3>
                        </li>
                    </ul>
                </div>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav margin-nav">
                        <li className="nav-item" id="dashboard">
                            <Link to="/dashboard" className="unset-anchor nav-link">Dashboard</Link>
                        </li>
                        <li className="nav-item" id="users">
                            <Link to="/users" className="unset-anchor nav-link">Users</Link>
                        </li>
                        <li className="nav-item" id="reimbursements">
                            <Link to="/reimbursements" className="unset-anchor nav-link">Reimbursements</Link>
                        </li>
                    </ul>
                </div>
                <div className="collapse navbar-collapse" id="navbarsExample04">
                    <ul className="navbar-nav ml-auto margin-nav">
                        <li className="nav-item" id="reimbursements">
                            <h5><Link to="/profile" className="unset-anchor nav-link">Profile</Link></h5>
                        </li>
                    </ul>
                </div>
                
            </nav>
        );
    }
}