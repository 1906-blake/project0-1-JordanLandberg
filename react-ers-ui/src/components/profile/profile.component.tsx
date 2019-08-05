import React, { Component } from 'react';
import User from '../../models/user';
import Reimbursement from '../../models/reimbursement';

interface IState {
    users: User[],
    reimbursements: Reimbursement[],
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string
}

export default class ProfileComponent extends Component<{}, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            users: [],
            reimbursements: [],
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            role: ''
        };
    }

    async componentDidMount() {
        const loggedInUserString = localStorage.getItem('user');
        const loggedInUser = loggedInUserString && JSON.parse(loggedInUserString);
        const userRes = await fetch(`http://localhost:8012/users/${loggedInUser.userId}`, {
            credentials: 'include'
        });
        const reimbursementRes = await fetch(`http://localhost:8012/reimbursements/author/${loggedInUser.userId}`, {
            credentials: 'include'
        });
        const reimbursements = await reimbursementRes.json();
        const users = await userRes.json();
        this.setState({
            users,
            reimbursements,
            username: users[0].username,
            firstName: users[0].firstName,
            lastName: users[0].lastName,
            email: users[0].email,
            role: users[0].role.role
        });
    }

    updateUserInformation = () => {
        // remove 'Update' button
        const updateButton = document.getElementsByClassName('profile-update-button-display')[0];
        updateButton.classList.remove('profile-update-button-display-display');
        updateButton.classList.add('profile-update-button-display-displaynone');
        // remove 'Add Submit Update' button
        const submitButton = document.getElementsByClassName('profile-submit-button-displaynone')[0];
        submitButton.classList.remove('profile-submit-button-displaynone');
        submitButton.classList.add('profile-submit-button-display');

        // add input boxes
        const updateTextbox = document.getElementsByClassName('update-textbox-hide')[0];
        updateTextbox.classList.remove('update-textbox-hide');
        updateTextbox.classList.add('update-textbox-show');
        // remove user info 
        const removeInfo = document.getElementsByClassName('update-information')[0];
        removeInfo.classList.remove('update-information');
        removeInfo.classList.add('update-information-hide');

    }

    updateUser = async () => {
        const updatedUser = {
            userId: this.state.users[0].userId,
            username: this.state.username,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        await fetch(`http://localhost:8012/users`, {
            method: 'PATCH',
            credentials: 'include',
            body: JSON.stringify(updatedUser),
            headers: {
                'content-type': 'application/json'
            }
        })
    }

    updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: event.target.value
        });
    }
    updateFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            firstName: event.target.value
        });
    }
    updateLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            lastName: event.target.value
        });
    }
    updateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            email: event.target.value
        });
    }
    updateRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            role: event.target.value
        });
    }

    render() {
        const users = this.state.users;
        const reimbursements = this.state.reimbursements;
        return (
            <div className="container-fluid">
                <h1>Profile</h1>
                <br/>
                <br/>
                <div className="row">
                    <div className="col-md-4">
                        <h3>Profile Pic</h3>
                        <br />
                        <img src="https://via.placeholder.com/250" alt="Placeholder Profile" />
                    </div>
                    <div className="col-md-8">
                        <h3>Profile Information</h3>
                        <br />
                        <br />
                        <div className="row">
                            <div className="col-md-6 profile-names">
                                <ul>
                                    <br/>
                                    <li><h5>Username: </h5></li>
                                    <li><h5>First Name: </h5></li>
                                    <li><h5>Last Name: </h5></li>
                                    <li><h5>Email: </h5></li>
                                    <li><h5>Role: </h5></li>
                                </ul>
                            </div>
                            <div className="col-md-6 profile-information">
                                {
                                    users.map(user =>
                                        <ul className="update-information">
                                            <br/>
                                            <li><h5>{user.username}</h5></li>
                                            <li><h5>{user.firstName}</h5></li>
                                            <li><h5>{user.lastName}</h5></li>
                                            <li><h5>{user.email}</h5></li>
                                            <li><h5>{user.role.role}</h5></li>
                                        </ul>
                                        
                                    )
                                }
                                <ul className="col-md-6 update-textbox-hide">
                                    <li><h5><input typeof="text" className="form-control updateUsername"
                                        placeholder="username" value={this.state.username}
                                        onChange={this.updateUsername} required /></h5></li>
                                    <li><h5><input typeof="text" className="form-control updateFirstName"
                                        placeholder="first name" value={this.state.firstName}
                                        onChange={this.updateFirstName} required /></h5></li>
                                    <li><h5><input typeof="text" className="form-control updateLastName"
                                        placeholder="last name" value={this.state.lastName}
                                        onChange={this.updateLastName} required /></h5></li>
                                    <li><h5><input typeof="text" className="form-control updateEmail"
                                        placeholder="email" value={this.state.email}
                                        onChange={this.updateEmail} required /></h5></li>
                                    <li><h5><input typeof="text" className="form-control"
                                        placeholder="role" value={this.state.role}
                                        onChange={this.updateRole} required /></h5></li>

                                    {/* <li><input typeof="text" className="form-control updateUsername"
                                        placeholder="username" value={this.state.username}
                                        onChange={this.updateUsername} required /></li>
                                    <li><input typeof="text" className="form-control updateFirstName"
                                        placeholder="first name" value={this.state.firstName}
                                        onChange={this.updateFirstName} required /></li>
                                    <li><input typeof="text" className="form-control updateLastName"
                                        placeholder="last name" value={this.state.lastName}
                                        onChange={this.updateLastName} required /></li>
                                    <li><input typeof="text" className="form-control updateEmail"
                                        placeholder="email" value={this.state.email}
                                        onChange={this.updateEmail} required /></li>
                                    <li><input typeof="text" className="form-control"
                                        placeholder="role" value={this.state.role}
                                        onChange={this.updateRole} required /></li> */}
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <button className="btn btn-secondary btn-info btn-custom profile-update-button-display" onClick={this.updateUserInformation}>Update</button>
                                <button className="btn btn-secondary btn-info btn-custom profile-submit-button-displaynone" onClick={this.updateUser}>Submit Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="reimbursement-table-container select-users">
                    <h2>{`${users[0] && users[0].firstName} ${users[0] && users[0].lastName}'s`} reimbursements</h2>
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
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reimbursements.map(reimbursement =>
                                    <tr key={'reimbursementId-' + reimbursement.reimbursementId}>
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
            </div>
        )
    }
}
