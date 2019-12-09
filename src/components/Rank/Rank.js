import React from 'react';
import './Rank.css';

class Rank extends React.Component {
    render() {
        return (
            <div>
                <div className="user-info">
                    {this.props.username}, your current entry count is: 
                </div>
                <div className="user-rank">
                    {this.props.entries}
                </div>
            </div>
        );
    }
}

export default Rank;