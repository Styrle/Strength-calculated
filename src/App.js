import React from 'react';
import './App.css';
import './components/Components.css';
import Login from './components/Login';
import Home from './components/Home';
import AddLifts from './components/AddLifts';
import Progress from './components/Progress';
import Signup from './components/Signup';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import session from './services/session';
import Header from "./components/Header";
import Recent from "./components/Recent";

//This is where we route all of our components
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showHeader: true,
            redirectTo: null,
        };
    }
    //This makes sure users are loggedIn so that the navigation can show
    componentDidMount() {
        if (session.get('loggedIn') && session.get('loggedIn') === 'true') {
            this.setState({ showHeader: true });
            this.setState({ redirectTo: '/home' });
        } else {
            this.setState({ showHeader: false });
            window.location.href.includes('signup') ? this.setState({ redirectTo: '/signup' }) : this.setState({ redirectTo: '/login' });
        }
    }
    render() {
        return (
            <div >
                <div>
                    <BrowserRouter>
                        {this.state.showHeader && <Header onLogout={() => this.setState({ showHeader: false })} />}
                        {this.state.redirectTo && <Redirect push to={this.state.redirectTo} />}
                        <Switch>
                            <Route exact path='/login'
                                render={props => <Login onLogout={() => this.setState({ showHeader: false })}
                                    onLogin={() => this.setState({ showHeader: true })} />} />
                            <Route exact path='/signup'
                                render={props => <Signup onSignup={() => this.setState({ showHeader: true })} />} />
                                <Route exact path='/home' render={props => <Home />} />
                                <Route exact path='/add' render={props => <AddLifts />} />
                                <Route exact path='/progress' render={props => <Progress />} />
                                <Route exact path='/recent' render={props => <Recent />} />
                        </Switch>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
