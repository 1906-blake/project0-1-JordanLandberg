import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NotFound from './components/not-found/not-found.component';
import { NavComponent } from './components/app-nav/app-nav.component';
import ReimbursementsComponent from './components/reimbursements/reimbursements.component';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <div className="App">
                <NavComponent/>
                {/* The switch will only render the first route that matches */}
                <Switch>
                    <Route path='/reimbursements' component={ReimbursementsComponent}/>
                    <Route component={NotFound}/>
                </Switch>
            </div> 
        </BrowserRouter>
    );
}

export default App;
