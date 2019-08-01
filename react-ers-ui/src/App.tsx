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

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <NavComponent/>
                {/* The switch will only render the first route that matches */}
                <Switch>
                    <Route path='/dashboard' component={DashboardComponent}/>
                    <Route path='/profile' component={AllReimbursementsComponent}/>
                    <Route path='/users/all' component={AllReimbursementsComponent}/>
                    <Route path='/users/id' component={AllReimbursementsComponent}/>
                    <Route path='/users/update' component={AllReimbursementsComponent}/>
                    <Route path='/users' component={UsersComponent}/>
                    <Route path='/login' component={LoginComponent}/>
                    <Route path='/reimbursements/all' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements' component={ReimbursementsComponent}/>
                    {/* <Route path='/reimbursements/status' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements/author' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements/update' component={AllReimbursementsComponent}/>
                    <Route path='/reimbursements/create' component={AllReimbursementsComponent}/> */}
                    <Route component={NotFound}/>
                </Switch>
            </div> 
        </BrowserRouter>
    );
}

export default App;
