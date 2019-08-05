import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { RouteComponentProps } from 'react-router-dom';

interface IState {
    username: string,
    password: string,
    errorMessage?: string
}

export default class LoginComponent extends Component<RouteComponentProps, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    login = async () => {
        const username = this.state.username;
        const password = this.state.password;
        const credentials = {
            username,
            password
        };
        try{
            const res = await fetch('http://localhost:8012/login', {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(credentials),
                headers: {
                    'content-type': 'application/json'
                }
            });
            const user = await res.json();
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err);
            console.log('Invalid Credentials');
            this.setState({
                errorMessage: 'Invalid Credentials'
            })
        }
    }

    updateUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            username: event.target.value
        })
    }

    updatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {
        return (
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputUsername" className="sr-only">Username</label>
                <input typeof="text" className="form-control nav-link"
                    placeholder="Username" value={this.state.username}
                    onChange={this.updateUsername} required autoFocus />
                <label htmlFor="inputUsername" className="sr-only">Password</label>
                <input typeof="text" className="form-control"
                    placeholder="Password" value={this.state.password}
                    onChange={this.updatePassword} required />
                
                <br/>
                {this.state.errorMessage && <p>{this.state.errorMessage}</p>}
                
                <Button className="btn btn-lg btn-block btn-info" onClick={this.login}>Login</Button>
                <p className="mt-5 mb-3 text-muted">&copy; ERS - JLandberg</p>

            </div>
        )
    }
}
