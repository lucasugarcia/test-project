import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Manage from './Pages/Manage/Manage'; 
import Chart from './Pages/Chart/Chart'; 
import Update from './Pages/Update/Update';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/manage' exact={true} component={Manage} />
            <Route path='/chart' exact={true} component={Chart} />
            <Route path='/update' exact={true} component={Update} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
