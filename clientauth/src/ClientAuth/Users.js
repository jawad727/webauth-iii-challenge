import React from 'react';
import axios from 'axios';

class Users extends React.Component {
    state = {
        users: [],
    }


    componentDidMount() {
        const endpoint = 'http://localhost:4000/api/users'
        const token = localStorage.getItem('jwt')
        const reqOptions = {
            headers: {
                authorization: token
            }
        }

        axios.get(endpoint, reqOptions).then( res => {
            this.setState({ users: res.data })
         })
    }


    render() {
        return (
            <>
            <h2>List of users</h2>
            <ul>
                {this.state.users.map(user => (
                 <li key={user.id}> {user.username} </li>
                ))}
            </ul>
            </>
        );
    }

}

export default Users;