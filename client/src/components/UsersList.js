import React from 'react';

import const_props, { UserContext } from '../constant_properties';
import '../style/UsersList.css';
import User from './User'

class UsersList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            users: [],
            ranks: [],
            usersLoaded: false,
            ranksLoaded: false
        };
    }

    fetchUsers(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/user`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include'
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({
                users: data,
                usersLoaded: true
            });
        });
    }

    fetchRanks(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank/`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include'
        })
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    ranks: data,
                    ranksLoaded: true
                });
            },
            (error) => {
                
            }
        );
    }

    componentDidMount(){
        this.fetchUsers();
        this.fetchRanks();
    }

    getUsers() {
        let u = [];
        this.state.users.forEach((user, i) => {
            user.no = i + 1;
            u.push(
                <User user={user} ranks={this.state.ranks} key={user.id}/>
            );
        });
        return u;
    }

    render(){
        if (this.state.usersLoaded && this.state.ranksLoaded) {
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
        else
        {
            return (
                <div className='users-list-site'>
                    loading...
                </div>
            );
        }
        
    }
}
UsersList.contextType = UserContext;

export default UsersList;