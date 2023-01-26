import React from 'react';

import '../style/Footer.css';

class Footer extends React.Component {
    render(){
        return (
            <div className="footer">
                <span>{this.props.author}</span>
                <span>©</span>
                <span>{this.props.year}</span>
            </div>
        );
    }
}

export default Footer;