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
                {/* {this.state?.ranks?.includes('User') ?  */}
                    <div className='user-panel'>
                        <h2>Panel użytkownika</h2>
                        <h3>Zmiana hasła</h3>
                        <div className='user-panel-section'> <ChangePasswordForm /> </div>
                    </div>
                 {/* : ''} */}
                {/* {this.state?.ranks?.includes('Editor') ?  */}
                    <div className='user-panel'>
                        <h2>Panel edytora</h2>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj filmami' className='s-input' onClick={() => {this.changeSite('#edit/movies')}}/>
                        </div>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj serialami' className='s-input'/>
                        </div>
                    </div>
                 {/* : ''} */}
                {this.context?.permissions?.includes('can-see-users') ? 
                    <div className='user-panel'>
                        <h2>Panel administratora</h2>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj użytkownikami' className='s-input' onClick={() => {this.changeSite('#users')}}/>
                        </div>
                    </div>
                 : ''}
            </div>
        );
    }
}
UserPanel.contextType = UserContext;

export default UserPanel;