import React from 'react';
import axios from 'axios';

class Register extends React.Component {
    state = {
        username: '',
        password: '',
        departments: ''
    }

    render() {
        return (
            <div>
            <h2>Register</h2>
            <form onSubmit={this.handleSubmit}>
                <div>

                    <label htmlFor="username"></label>
                    <input 
                    name="username" 
                    id="username" 
                    value={this.state.username} 
                    onChange={this.handleInput} 
                    type="text"
                    />

                    </div>
                    <div>

                    <label htmlFor="password"></label>
                    <input 
                    name="password" 
                    id="password" 
                    value={this.state.password} 
                    onChange={this.handleInput} 
                    type="password"
                    />

                    <label htmlFor="departments"></label>
                    <input 
                    name="departments" 
                    id="departments" 
                    value={this.state.departments} 
                    onChange={this.handleInput} 
                    type="text"
                    />

                    </div><button type="submit"> Register </button>
            </form>
            </div>
        );
    }

    handleInput = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value })
    }

    handleSubmit = event => {
        event.preventDefault();

        const endpoint = 'http://localhost:4000/api/register'

        axios
        .post(endpoint, this.state).then(res => {
            console.log(res)
            
            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users')

        }).catch(error => console.error(error))

    }

}

export default Register;