import React from 'react';
import './FaceRecognition.css';

class FaceRecognition extends React.Component {
    render() {
        
        const boxArray = this.props.boxArray;
        // Create style for muliple face locations
        const divs = boxArray.map((box, index) => {
            let boxStyle = {
                top: box.topRow,
                bottom: box.bottomRow,
                left: box.leftCol,
                right: box.rightCol,
            }
            return <div className="region-box" style={boxStyle} key={index}></div>
        })
        return (
            <div className="center img-container">
                <div className="img-position">
                    <img id="input-image" src={this.props.imageSrc} alt="" width="500" height="auto" />
                    {divs}
                </div>
            </div>
        );
    }
}

export default FaceRecognition;