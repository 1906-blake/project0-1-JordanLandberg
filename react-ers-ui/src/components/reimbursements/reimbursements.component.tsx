import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ReimbursementsComponent extends Component {

    render() {
        return (
            <div className="select-users">
                <h2>Welcome to Reimbursements</h2>
                <h4>Would you like to view:</h4>
                <Link to="/reimbursements/all">
                    <button className="btn btn-secondary btn-lg btn-info btn-custom">All Reimbursements</button>
                </Link>
                <Link to="/reimbursements/author/id">
                <button className="btn btn-secondary btn-lg btn-info btn-custom">All Reimbursements By Author ID</button>
                </Link>
                <Link to="/reimbursements/status/id">
                <button className="btn btn-secondary btn-lg btn-info btn-custom">All Reimbursements By Status Type</button>
                </Link>
            </div>
        )
    }
}
