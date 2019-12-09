import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

class Logo extends React.Component {
    render() {
        return (
            <div className="logo-container">
                <Tilt className="Tilt tilt-logo" options={{ max : 25 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner img-container">
                        <img src={brain} alt="brain-logo" width="100" height="100"/>
                    </div>
                </Tilt>
            </div>
        );
    }
}

export default Logo;