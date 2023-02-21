import React from 'react';

import const_props, { UserContext } from '../constant_properties';
import '../style/User.css';

class User extends React.Component {

    constructor(props){
        super(props);

        this.state = { };
    }

    getOtherRanks(rankId) {
        let rankOptions = [];
        this.props.ranks.forEach(rank => {
            if (rank.id !== rankId) {
                rankOptions.push(
                    <option key={rank.id} value={rank.id}>{rank.nazwa}</option>
                )
            }
        });
        return rankOptions;
    }

    changeRank(selected)
    {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/user/updateRank/${this.props.user.id}`;
        fetch(url, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${this.context.accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify({rankId: selected.target.value})
            });
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
                    <select onChange={(selected) => this.changeRank(selected)}>
                        <option key={this.props.user.ranga_id} value={this.props.user.ranga_id}>{this.props.user.ranga_nazwa}</option>
                        {this.getOtherRanks(this.props.user.ranga_id)}
                    </select>
                </div>

                {this.context?.permissions?.includes('delete_movie') ? 
                    <div className='delete-user-field'>
                        <input type="button" id={this.props.user.id} defaultValue="Usuń" onClick={e => {e.preventDefault(); this.props.onDeleteUser(e.target.id)}}></input>
                    </div>
                : ''}
            </div>
        );
    }
}
User.contextType = UserContext;

export default User;