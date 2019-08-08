import React, { Component } from 'react'
import Reimbursement from '../../models/reimbursement';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import User from '../../models/user';

interface IState {
    reimbursements: Reimbursement[],
    loggedInUser?: User
}

export default class AllReimbursementsComponent extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: [],
        };
    }

    async componentDidMount() {
        const loggedInUserString = localStorage.getItem('user');
        const loggedInUser = loggedInUserString && JSON.parse(loggedInUserString);
        this.setState({
            loggedInUser
        })
        const resp = await fetch('http://localhost:8012/reimbursements', {
            credentials: 'include'
        });
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
    }

    approveReimbursement = async (reimbursement: Reimbursement) => {
        const date = new Date();
        const time = date.getTime();
        const loggedInUser = this.state.loggedInUser;
        const userId = loggedInUser && loggedInUser.userId;
        const body = {
            reimbursementId: reimbursement.reimbursementId,
            dateResolved: time,
            resolver: {
                userId
            },
            status: {
                statusId: 2
            }
        }
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    denyReimbursement = async (reimbursement: Reimbursement) => {
        const date = new Date();
        const time = date.getTime();
        const loggedInUser = this.state.loggedInUser;
        const userId = loggedInUser && loggedInUser.userId;
        const body = {
            reimbursementId: reimbursement.reimbursementId,
            dateResolved: time,
            resolver: {
                userId
            },
            status: {
                statusId: 3
            }
        }
                                                                   
        await fetch('http://localhost:8012/reimbursements', {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div className="reimbursement-table-container select-users">
                <h2>All Reimbursements</h2>
                <Link to="/reimbursements/author/id">
                    <button className="btn btn-secondary btn-lg btn-info btn-custom">All Reimbursements By Author ID</button>
                </Link>
                <Link to="/reimbursements/status/id">
                    <button className="btn btn-secondary btn-lg btn-info btn-custom">All Reimbursements By Status Type</button>
                </Link>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Reimbursement ID #</th>
                            <th scope="col">Author Full Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Date Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Resolver Full Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                            <th scope="col">Approve/<br/>Deny</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            reimbursements.map(reimbursement =>
                                <tr key={'reimbursementId-'+reimbursement.reimbursementId}>
                                    <td>{reimbursement.reimbursementId}</td>
                                    <td>{reimbursement.author && `${reimbursement.author.firstName} ${reimbursement.author.lastName}`}</td>
                                    <td>{reimbursement.amount}</td>
                                    <td>{reimbursement.dateSubmitted}</td>
                                    <td>{reimbursement.dateResolved}</td>
                                    <td>{reimbursement.description}</td>
                                    <td>{reimbursement.resolver && `${reimbursement.resolver.firstName} ${reimbursement.resolver.lastName}`}</td>
                                    <td>{reimbursement.status.status}</td>
                                    <td>{reimbursement.type.type}</td>
                                    <td>
                                        <Button key={'reimbursementIdApprove-'+reimbursement.reimbursementId} color="success" onClick={() => this.approveReimbursement(reimbursement)}>Approve</Button>
                                        <Button key={'reimbursementIdDeny-'+reimbursement.reimbursementId} color="danger" onClick={() => this.denyReimbursement(reimbursement)}>Deny</Button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
