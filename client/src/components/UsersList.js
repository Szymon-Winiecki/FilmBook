import React from 'react';

import const_props from '../constant_properties';
import '../style/UsersList.css';
import User from './User'

class UsersList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            users: []
        };
    }

    fetchUsers(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/user`).then((response) => response.json()).then((data) => {
            this.setState({
                users: data
            });
        });
    }

    componentDidMount(){
        this.fetchUsers();
    }

    getUsers() {
        let u = [];
        this.state.users.forEach((user, i) => {
            user.no = i + 1;
            u.push(
                <User user={user} key={user.id}/>
            );
        });
        return u;
    }

    render(){
        return (
            <div className='users-list-site'>
                <h1 className='section-title'>Użytkownicy</h1>
                <div className='user-list-controlls'>
                    <div className='list-controll'>
                        <label htmlFor='rank-select' className='list-control-label'>Ranga: </label>
                        <select id='rank-select'>
                            
                        </select>
                    </div>
                    <div className='list-controll'>
                        <label htmlFor='sort-select' className='list-control-label'>Sortuj wg: </label>
                        <select id='sort-select'>
                            <option value='rate_asc'>nazwa (rosnąco)</option>
                            <option value='rate_desc'>nazwa (malejąco)</option>
                        </select>
                    </div>
                </div>

                <div className='movies-list-container'>
                    <div className='users-list-header'>
                        <div className='no-header'>lp.</div>
                        <div className='username-header'>nazwa użytkownika</div>
                        <div className='email-header'>email</div>
                        <div className='rank-header'>ranga</div>
                    </div>

                    <div className="users-list">
                        {this.getUsers()}
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersList;