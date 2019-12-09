import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',    
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

    onEmailChange = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    onSubmitClick = () => {
        fetch('https://secure-plains-33429.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(data => {
            if (data.id) {
                this.props.onRouteChange('signin');
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
                        {(this.state.error) ? <h4 style={{color: 'red'}}>Please fill in the form correctly</h4> : ''}
                    </div>
                    <div className="input-div">
                        <label htmlFor="username">
                            Username:
                            <br />
                            <input onChange={this.onUsernameChange} type="text" name="username" id="username" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label htmlFor="email">
                            Email:
                            <br />
                            <input onChange={this.onEmailChange} type="text" name="email" id="email" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label htmlFor="password">
                            Password:
                            <br />
                            <input onChange={this.onPasswordChange} type="password" name="password" id="password" />
                        </label>
                    </div>
                    <input onClick={this.onSubmitClick} className="submit-button" type="submit" value="Register" />
                    <br/>
                    <button onClick={() => this.props.onRouteChange('signin')} className="signin-button">Login</button>
                    <br />
                </div>
            </div>
        );
    }
}

export default Register;