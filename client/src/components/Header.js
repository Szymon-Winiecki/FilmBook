import React from 'react';

import '../style/Header.css';

class Header extends React.Component {

    getNav(nav, i){
        return(
            <div className='header-nav' onClick={nav.onClick} key={i}>
                {nav.label}
            </div>
        );
    }

    getNavBar(){
        let navs = new Array(this.props.navs.length);
        for(let i = 0; i < this.props.navs.length; ++i){
            navs[i] = this.getNav(this.props.navs[i]);
        }
        return(
          <div className='header-nav-bar'>
            {navs}
          </div>  
        );
    }

    render(){
        return (
            <div className='header'>
                <div className='header-title-section'>
                    <span className='header-primary-text'>{this.props.primaryText}</span>
                    { this.props.secondaryText ? <span className='header-secondary-text'>{this.props.secondaryText}</span> : ''}
                </div>
                { (this.props.navs) ? this.getNavBar() : ''}
            </div>
        );
    }
}

export default Header;