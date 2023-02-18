import React from 'react';

import '../style/User.css';

class User extends React.Component {

    constructor(props){
        super(props);

        this.state = { };
    }

    render(){
        return (
            <div className="user-row">
                <div className='no-field'>
                    { this.props.user.no }.
                </div>

                <div className='username-field'> 
                    <span className='user-username'>{ this.props.user.nazwa }</span>
                </div>

                <div className='email-field'> 
                    <span className='user-email'>{ this.props.user.email }</span>
                </div>

                <div className='rank-field'> 
                    <span className='user-rank'>{ "ranga użytkownika" }</span>
                </div>
            </div>
        );
    }
}

export default User;