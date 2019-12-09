import React from 'react';
import './ImageLinkForm.css';

class ImageLinkForm extends React.Component {
    render() {
        return (
            <div>
                <p className="image-text">
                    This magic brain will detect faces in your picture.
                </p>
                <div className="sector-container">
                    <input type="text" name="image-url" onChange={this.props.onInputChange}/>
                    <button onClick={this.props.onButtonSubmit}>Detect</button>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;