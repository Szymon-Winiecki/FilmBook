import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import '../style/UserPanel.css';
import '../style/inputs.css';

import ChangePasswordForm from './ChangePasswordForm';


class UserPanel extends React.Component {

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className="user-panel-site">
                    <div className='user-panel'>
                        <h2>Panel użytkownika</h2>
                        <h3>Zmiana hasła</h3>
                        <div className='user-panel-section'> <ChangePasswordForm /> </div>
                    </div>
                    <div className='user-panel'>
                        {this.context?.permissions?.includes('get_users') || this.context?.permissions?.includes('get_ranks')  ? 
                            <h2>Panel administratora</h2>
                        : ''}
                        {this.context?.permissions?.includes('get_users') ? 
                            <div className='user-panel-section'> 
                                <input type='button' value='zarządzaj użytkownikami' className='s-input' onClick={() => {this.changeSite('#users')}}/>
                            </div>
                        : ''}
                        {this.context?.permissions?.includes('get_ranks') ? 
                            <div className='user-panel-section'> 
                                <input type='button' value='zarządzaj rangami' className='s-input' onClick={() => {this.changeSite('#ranks')}}/>
                            </div>
                        : ''}
                    </div>
            </div>
        );
    }
}
UserPanel.contextType = UserContext;

export default UserPanel;