import React from 'react';
import UserService from '../services/user';
import session from '../services/session';
import {Redirect} from 'react-router-dom';
import WeightsDropdown from "./WeightsDropdown";
import AgesDropdown from "./AgesDropdown";
import Verticalh from "./Verticalh";
import './Forms.css';
//Creating our signup page with appropriate connections to our api to input data
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      age: '',
      weight: '',
      password: '',
      errorMessage: '',
      successMessage: '',
      redirectTo: null,
    };
  }
  //Sending our data to our api with our service connection to handle
  handleSignup = async e => {
    e.preventDefault();
    await UserService.signup({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      age: this.state.age,
      weight: this.state.weight
    })
      .then(result => {
        if (result.error) {
          this.setState({errorMessage: result.error});
          return;
        }
        //Results after the user inputs data
        if (result.data) {
          const data = result.data;
            this.setState({errorMessage: ''});
            this.setState({successMessage: "Signup successful! Redirecting..."});
            //Initial login redirect so users can add data
            session.set('loggedIn', true);
            session.set('user', data);
            this.props.onSignup();
            this.setState({redirectTo: '/add'});
          }
      });
  }

  render() {
    return (
      <div className="Signup">
        <Verticalh/>
          {this.state.redirectTo && <Redirect push to={this.state.redirectTo}/>}
          <div className="Container-form">
            <div className="direct-buttons">
              <a href="/login" className="login-select">Login</a>
              <a href="/signup" className="signup-select signup-active">Signup</a>
            </div>
            <form onSubmit={this.handleSignup}>
              <div className="form-group">
                <input type="text" className="form-control"
                   placeholder="Full name" required="required"
                   value={this.state.name} onChange={e => this.setState({name: e.target.value})}/>
              </div>
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
              <div className="form-group">
                <AgesDropdown
                  required="required"
                  preselect=''
                  onChange={val => this.setState({age: val})}/>
              </div>
              <div className="form-group">
                <WeightsDropdown
                  required="required"
                  preselect=''
                  onChange={val => this.setState({weight: val})}/>
              </div>
              {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
              {this.state.successMessage &&
            <div className="alert alert-success">{this.state.successMessage}</div>}
            <button type="submit" className="signup-button"
                onClick={e => this.handleSignup(e)}>Create account
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Signup;
