import React, { useState } from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
      credentials: {
          username: "",
          password:""
      }
  }

  handleChange = e => {
      this.setState({
        credentials: {
          ...this.state.credentials,
          [e.target.name]: e.target.value
        }
      });
  };

  login = e => {
      e.preventDefault();
      // make a POST request to the server
      // the server will "authenticate" the user based on their credentials
      // If they can be authenticated the server will return a token
      axios
        .post('http://localhost:5000/api/login', this.state.credentials)
        
        .then(res => {
          console.log("this is response", res.data)
          localStorage.setItem('token', res.data.payload);
          console.log("this is local storage", localStorage)
          this.props.history.push('/bubble-page');
        })
        .catch(err => console.log(err));
    };


  render(){
      return (
      <div>
          <form onSubmit={this.login}>
              <input 
                  type="text"
                  name="username"
                  value= {this.state.credentials.username}
                  placeholder="username"
                  onChange={this.handleChange}
              
              />
              <input 
                  type="password"
                  name="password"
                  placeholder="password"
                  value={this.state.credentials.password}
                  onChange={this.handleChange}
              />
              <button>Log In</button>
              
          </form>
      </div>
      );
  }
}

export default Login;

