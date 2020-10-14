import React from 'react';
import userService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import Verticalh from "./Verticalh";
import './Forms.css';

//Creating our login page with appropriate connections to our api to check user input data
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.props.onLogout();
        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            successMessage: '',
            redirectTo: null,
        };
    }

    handleLogin = async e => {
        e.preventDefault();

        await userService.login({email: this.state.email, password: this.state.password})
            .then(result => {
                if (result.error) {
                    this.setState({errorMessage: result.error});
                    return;
                }
                //Results after the user inputs data
                if (result.data) {
                    const data = result.data;
                    this.setState({errorMessage: ''});
                    this.setState({successMessage: "Login successful! Redirecting..."});

                    session.set('loggedIn', true);
                    session.set('user', data);
                    this.props.onLogin();
                    this.setState({redirectTo: `/home`});
                }
            });
    }

    render() {
        return (
              <div className="Login">
                <Verticalh/>
                  {this.state.redirectTo && <Redirect push to={this.state.redirectTo}/>}
                  <div className="Container-form row-md-6">
                    <div className="direct-buttons">
                      <a href="/login" className="login-select login-active">Login</a>
                      <a href="/signup" className="signup-select">Sign up</a>
                    </div>
                        <form onSubmit={this.handleLogin}>
                          <div className="form-group">
                              <input type="email" className="form-control"
                                     placeholder="Email address" required="required"
                                     value={this.state.email} onChange={e => this.setState({email: e.target.value})}/>
                          </div>
                          <div className="form-group">
                              <input type="password" className="form-control"
                                     placeholder="Password" required="required"
                                     value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                          </div>

                          {this.state.errorMessage && <div className="alert alert-danger failed-input">{this.state.errorMessage}</div>}

                          {this.state.successMessage &&
                          <div className="alert alert-success">{this.state.successMessage}</div>}



                          <button type="submit" className="login-button" onClick={e => this.handleLogin(e)}>Login
                          </button>
                      </form>
                </div>
            </div>

        );
    }
}

export default Login;
