import React from 'react';

import '../style/Header.css';

class Header extends React.Component {
    render(){
        return (
            <div className='header'>
                <span className='header-primary-text'>{this.props.primaryText}</span>
                <span className='header-secondary-text'>{this.props.secondaryText}</span>
            </div>
        );
    }
}

export default Header;