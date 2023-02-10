import React from 'react';

import '../style/UserPanel.css';

class UserPanel extends React.Component {
    render(){
        if(this.props.username){
            return (
                <div className='user-panel'>
                    <div className='user-panel-info'>
                        <div className='user-panel-avatar'><i class="bi bi-person-circle"></i></div>
                        <div className='user-panel-name'>{this.props.username}</div>
                    </div>
                    <div className='user-panel-logout' onClick={this.props.onLogout}>
                        <i className="bi bi-box-arrow-right"></i>
                        <span>log out</span>
                    </div>
                </div>
            );
        }
        else{
            return (
                <div className='user-panel'>
                    <div className='user-panel-login' onClick={this.props.onLogin}>
                        <i className="bi bi-box-arrow-in-right"></i>
                        <span>log in</span>
                    </div>
                    <div className='user-panel-register' onClick={this.props.onRegister}>
                        <i className="bi bi-pencil-square"></i>
                        <span>register</span>
                    </div>
                </div>
            );
        }
        
    }
}

export default UserPanel;