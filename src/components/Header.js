import React from 'react';
import session from '../services/session';
import {Redirect, NavLink} from 'react-router-dom';
import './Components.css';
//Naviagtion class
class Header extends React.Component {
    constructor(props) {
        super(props);
        if (session.get('loggedIn') && session.get('loggedIn') === true)
            this.props.onLogout();

        this.state = {
            redirectTo: null,
        };
    }

    //Function to handle our logout, called in the button below
    handleLogout = e => {
        e.preventDefault();
        session.clear();
        this.setState({redirectTo: '/login'});
    }

    render() {
        return (
            <div >
                {this.state.redirectTo && <Redirect push to={this.state.redirectTo}/>}
                <nav className="navbar navbar-expand-md main-colour" >
                      <button className="mr-auto mobile-nav navbar-toggler navbar-light " data-toggle="collapse" data-target="#collapse-target" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                    <div className="collapse navbar-collapse" id="collapse-target">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="menu nav-link" to="/home">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="menu nav-link" to="/progress">Progress</NavLink>
                            </li>
                            <li className=" nav-item">
                                <NavLink className="menu nav-link" to="/add">Add Lifts</NavLink>
                            </li>
                        </ul>
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                                <button className="sign-out nav-link" onClick={e => this.handleLogout(e)}>Logout</button>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
        );
    }
}

export default Header;
