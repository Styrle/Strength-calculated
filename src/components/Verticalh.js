import React from 'react';
import config from "../config";
import './Forms.css';

//Here we are creating a header like component to be used on both the login and signup page, this will eliminate some white space on thses pages and also give us some space for branding
class Verticalh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="verticalh">
        <header className="title">{config.appTitle}</header>
        <img className="verticalh-icon"
         src='logo.png'  alt="our app logo"/>
      </div>
    );
  }
}

export default Verticalh;
