import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import '../style/UserPanel.css';

class UserPanel extends React.Component {

    async fetchUserRanks(user){
        console.log(user.accessToken);
        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/users/ranks`, {
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
                {this.state?.ranks?.includes('User') ? <div className=''>Panel użytkownika</div> : ''}
                {this.state?.ranks?.includes('Editor') ? <div className=''>Panel edytora</div> : ''}
                {this.state?.ranks?.includes('Admin') ? <div className=''>Panel administratora</div> : ''}
            </div>
        );
    }
}
UserPanel.contextType = UserContext;

export default UserPanel;