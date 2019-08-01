import React, { Component } from 'react'

export default class DashboardComponent extends Component {

    render() {
        return (
            <div className="dashboard">
                <h1>Welcome to the Expense Reimbursement System</h1>
                <p>If you would like to view users, click 'Users' in the menu above</p>
                <p>If you would like to view reimbursements, click 'Reimbursements' in the menu above</p>
                <p>Want to check out your profile? Click 'Profile' in the menu above</p>
            </div>
        )
    }
}
