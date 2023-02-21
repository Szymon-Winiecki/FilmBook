import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';
import '../style/RankDetails.css';

class RankDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            rankLoaded: false,
            permissionsLoaded: false,
            rank: {},
            permissions: []
        };
    }

    fetchRank(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank/${this.props.rankId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    rankLoaded: true,
                    rank: data[0]
                    });
            },
            (error) => {
                this.setState({
                    rankLoaded: true,
                    error
                });
            }
        );
    }

    fetchRankPermissions() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/permission/${this.props.rankId}`;
        fetch(url, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include',
        })
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    permissionsLoaded: true,
                    permissions: data
                    });
            },
            (error) => {
                this.setState({
                    permissionsLoaded: true,
                    error
                });
            }
        );
    }

    deleteRank() {
        console.log('delete rank');
    }

    componentDidMount(){
        this.fetchRank();
        this.fetchRankPermissions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rankId !== this.props.rankId) {
          this.fetchRank();
          this.fetchRankPermissions();
        }
    }

    getPermissions() {
        if (!this.state.permissions)
            return
        
        let p = [];
        this.state.permissions.forEach(permission => {
            p.push(
                <div key={permission.nazwa} className='permissions-list-row'>
                    <span className='permission-name'>{permission.nazwa} </span>
                    <span className='permission-description'>{permission.opis}</span>
                </div>
            );
        });
        return p;
    }

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        else if (this.state.rank) {
            return (
                <div className="rank-details-site">
                    <h1>{this.state.rank.nazwa}</h1>
                    {this.getPermissions()}
                    {this.context?.permissions?.includes('alter_rank') ? 
                        <input type='button' value='Edytuj rangę' className='s-input' onClick={() => {this.changeSite(`#edit/rank/${this.state.rank.id}`)}}/>
                    : ''}
                    {this.context?.permissions?.includes('delete_rank') ? 
                        <input type='button' value='Usuń rangę' className='s-input' onClick={() => this.deleteRank()}/>
                    : ''}
                </div>
            );
        }
        else {
            return (
                <h1>Nie ma takiej rangi</h1>
            );
        }
    }
}
RankDetails.contextType = UserContext;

export default RankDetails;