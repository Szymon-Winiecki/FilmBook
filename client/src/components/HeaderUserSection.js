import React from 'react';

import '../style/HeaderUserSection.css';

class HeaderUserSection extends React.Component {
    render(){
        if(this.props.username){
            return (
                <div className='user-section'>
                    <div className='user-section-info' onClick={this.props.onOpenUserPanel}>
                        <div className='user-section-avatar'><i className="bi bi-person-circle"></i></div>
                        <div className='user-section-name'>{this.props.username}</div>
                    </div>
                    <div className='user-section-logout' onClick={this.props.onLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>wyloguj się</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='user-section'>
                    <div className='user-section-login' onClick={this.props.onLogin}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>zaloguj się</span>
                    </div>
                    <div className='user-section-register' onClick={this.props.onRegister}>
                        <i className="bi bi-pencil-square"></i>
                        <span>zarejestruj się</span>
                    </div>
                </div>
            );
        }
        
    }
}

export default HeaderUserSection;