import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom'

import './App.css';
import Login from './ClientAuth/Login';
import Users from './ClientAuth/Users';

class App extends Component {
  render() {
    return (
      <>
       <header>
        <nav>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/users">Users</NavLink>
      <button onClick={this.logout}> Logout </button>
        </nav>
       </header>
        <main>
      <Route path="/login" component={Login}></Route>
      <Route path="/users" component={Users}></Route>
        </main>

      </>
    );
  }

  logout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login')
  }


}

export default withRouter(App);//Login and Users is already 
