import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import { NavComponent } from './components/app-nav/app-nav.component';
import AllReimbursementsComponent from './components/reimbursements/all-reimbursements.component';
import LoginComponent from './components/login/login.component';
import ReimbursementsComponent from './components/reimbursements/reimbursements.component';
import UsersComponent from './components/users/users.component';
import DashboardComponent from './components/dashboard/dashboard.componant';
import ReimbursementsByAuthorComponent from './components/reimbursements/reimbursements-by-author-id.component';
import ReimbursementsByStatusComponent from './components/reimbursements/reimbursements-by-status-id.component';
import AllUsersComponent from './components/users/all-users.component';
import UsersByUserIdComponent from './components/users/users-by-id.component';
import ProfileComponent from './components/profile/profile.component';
import CreateReimbursementComponent from './components/reimbursements/create-reimbursement.component';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <NavComponent/>
                {/* The switch will only render the first route that matches */}
                <Switch>
                    <Route path='/dashboard' component={DashboardComponent}/>
                    <Route path='/profile' component={ProfileComponent}/>
                    <Route path='/users/all' component={AllUsersComponent}/>
                    <Route path='/users/id' component={UsersByUserIdComponent}/>
                    <Route path='/users' component={UsersComponent}/>
                    <Route path='/login' component={LoginComponent}/>
                    <Route path='/reimbursements/all' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements/author' component={ReimbursementsByAuthorComponent}/>
                    <Route path='/reimbursements/status' component={ReimbursementsByStatusComponent}/>
                    <Route path='/reimbursements/create' component={CreateReimbursementComponent}/>
                    <Route path='/reimbursements' component={ReimbursementsComponent}/>
                    <Route component={NotFound}/>
                </Switch>
            </div> 
        </BrowserRouter>
    );
}

export default App;
