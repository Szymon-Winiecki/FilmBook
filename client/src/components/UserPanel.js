import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import '../style/UserPanel.css';
import '../style/inputs.css';

import ChangePasswordForm from './ChangePasswordForm';


class UserPanel extends React.Component {

    async fetchUserRanks(user){
        console.log(user.accessToken);
        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/user/ranks`, {
                method: 'GET',
                headers: {
                    Authentication: `Bearer ${user.accessToken}` 
                },
                credentials: 'include'
            });            

            if(!response.ok){
                console.log(response.status);
            }
            else{
                const data = await response.json();

                this.setState({
                    ranks: data
                });
            }

        } catch (err){
            console.log(err);
        }
    }

    componentDidMount(){
        this.fetchUserRanks(this.context);
    }

    render(){
        return (
            <div className="user-panel-site">
                {this.state?.ranks?.includes('User') ? 
                    <div className='user-panel'>
                        <h2>Panel użytkownika</h2>
                        <h3>Zmiana hasła</h3>
                        <div className='user-panel-section'> <ChangePasswordForm /> </div>
                    </div>
                 : ''}
                {this.state?.ranks?.includes('Editor') ? 
                    <div className='user-panel'>
                        <h2>Panel edytora</h2>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj filmami' className='s-input'/>
                        </div>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj serialami' className='s-input'/>
                        </div>
                    </div>
                 : ''}
                {this.state?.ranks?.includes('Admin') ? 
                    <div className='user-panel'>
                        <h2>Panel administratora</h2>
                        <div className='user-panel-section'> 
                            <input type='button' value='zarządzaj użytkownikami' className='s-input'/>
                        </div>
                    </div>
                 : ''}
            </div>
        );
    }
}
UserPanel.contextType = UserContext;

export default UserPanel;