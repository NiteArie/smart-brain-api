import React from 'react';
import './Navigation.css';
class Navigation extends React.Component {
    handleLogout = () => {
        this.props.unloadUserProfile();
        this.props.onRouteChange('signin');
    }
    render() {
        return (
            <nav className="nav-bar">
                <p onClick={this.handleLogout}>Sign Out</p>
            </nav>
        );
    }
}

export default Navigation;