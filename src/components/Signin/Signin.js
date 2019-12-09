import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false,
        }
    }

    onUsernameChange = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    onPasswordChange = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    onSubmitClick = (event) => {
        fetch('https://secure-plains-33429.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })    
        }).then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.loadUserProfile(data);
                this.props.onRouteChange('home');
            } else {
                this.setState({
                    error: true,
                })
            }
        })
        
    }

    render() {
        return (
            <div className="form-container">
                <div className="form-layer-2">
                    <div className="input-div">
                        {(this.state.error) ? <h4 style={{color: 'red',}}>Wrong username or password</h4> : ''}
                    </div>
                    <div className="input-div">
                        <label htmlFor="username">
                            Username:
                            <br />
                            <input onChange={this.onUsernameChange} type="text" name="username" id="username" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label htmlFor="password">
                            Password:
                            <br />
                            <input onChange={this.onPasswordChange} type="password" name="password" id="password" />
                        </label>
                    </div>
                    <input onClick={this.onSubmitClick}className="submit-button" type="submit" value="Sign In" />
                    <br />
                    <button onClick={() => this.props.onRouteChange('register')}className="register-button">Register</button>
                    </div>
            </div>
        );
    }
}

export default Signin;