import React, { Component } from 'react'
import Reimbursement from '../../models/reimbursement';

interface IState {
    reimbursements: Reimbursement[]
}

export default class AllReimbursementsComponent extends Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            reimbursements: []
        };
    }

    async componentDidMount() {
        const resp = await fetch('http://localhost:8012/reimbursements', {
            credentials: 'include'
        });
        const reimbursements = await resp.json();
        this.setState({
            reimbursements
        });
        console.log(reimbursements);
    }

    render() {
        const reimbursements = this.state.reimbursements;
        return (
            <div className="reimbursement-table-container">
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Reimbursement ID</th>
                            <th scope="col">Author Full Name</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Date Submitted</th>
                            <th scope="col">Date Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Resolver Full Name</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
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
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
