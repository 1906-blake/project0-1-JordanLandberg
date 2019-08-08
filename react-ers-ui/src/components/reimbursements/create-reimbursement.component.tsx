import React, { Component } from 'react';
import User from '../../models/user';

interface IState {
    users: User[],
    amount?: number,
    description?: string,
    type?: number,
    dateSubmitted?: number
}

export default class CreateReimbursementComponent extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: []
        };
    }

    async componentDidMount() {
        const loggedInUserString = localStorage.getItem('user');
        const loggedInUser = loggedInUserString && JSON.parse(loggedInUserString);
        const userRes = await fetch(`http://localhost:8012/users/${loggedInUser.userId}`, {
            credentials: 'include'
        });
        console.log(userRes)
        const users = await userRes.json();
        console.log(users)
        this.setState({
            users
        });
    }

    updateReimbursement = async () => {
        const date = new Date();
        const time = date.getTime();
        const updatedReimbursement = {
            author: {
                userId: this.state.users[0].userId
            },
            amount: this.state.amount,
            dateSubmitted: time,
            description: this.state.description,
            status: {
                statusId: 1 // Pending defualt for new reimbursements
            },
            type: {
                typeId: this.state.type
            }
        };
        const updateResponse = await fetch(`http://localhost:8012/reimbursements`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(updatedReimbursement),
            headers: {
                'content-type': 'application/json'
            }
        });
        const confirmUpdate = document.getElementById('confirm-update');
        if(updateResponse.status === 200 && confirmUpdate){
            confirmUpdate.innerText = 'Reimbursement Created';
        } else if(confirmUpdate) {
            confirmUpdate.innerText = 'Reimbursement Creation Failed. Please Try Again';
        }
    }

    updateAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            amount: +event.target.value
        });
    }
    updateDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: event.target.value
        });
    }
    updateType = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            type: +event.target.value
        });
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <h1 className="col-md-12">Create Reimbursement</h1>
                </div>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-2">
                        <input typeof="number" className="form-control updateAmount"
                            placeholder="Amount" value={this.state.amount}
                            onChange={this.updateAmount} required />
                    </div>
                    <div className="col-md-2">
                        <input typeof="number" className="form-control updateType"
                            placeholder="Type" value={this.state.type}
                            onChange={this.updateType} required />
                    </div>
                    <div className="col-md-4 text-left">
                        <ol>
                            <li>Lodging</li>
                            <li>Travel</li>
                            <li>Food</li>
                            <li>Other</li>
                        </ol>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <input typeof="text" className="form-control updateDescription"
                            placeholder="Description" value={this.state.description}
                            onChange={this.updateDescription} required />
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <br/>
                <p id="confirm-update"></p>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <button className="btn btn-lg btn-secondary btn-info btn-custom" onClick={this.updateReimbursement}>Submit Reimbursement</button>
                    </div>
                    <div className="col-md-3"></div>
                </div>
                
                
            </div>
        )
    }
}
