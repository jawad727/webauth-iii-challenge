import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    state = {
        username: '',
        password: ''
    }

    render() {
        return (
            <div>
            <h2>List of login</h2>
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

                    </div><button type="submit"> Login </button>
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

        const endpoint = 'http://localhost:4000/api/login'

        axios
        .post(endpoint, this.state).then(res => {

            localStorage.setItem('jwt', res.data.token);
            this.props.history.push('/users')

        }).catch(error => console.error(error))

    }

}

export default Login;