import React from 'react';

import const_props from '../constant_properties';
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
                headers: { 'Content-Type': 'application/json' },
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
            </div>
        );
    }
}

export default User;