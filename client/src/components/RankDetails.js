import React from 'react';

import const_props from '../constant_properties';
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
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank/${this.props.rankId}`)
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

    fetchOwnPermissions() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/permission/${this.props.rankId}`;
        fetch(url)
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

    componentDidMount(){
        this.fetchRank();
        this.fetchOwnPermissions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rankId !== this.props.rankId) {
          this.fetchRank();
          this.fetchOwnPermissions();
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

    render(){
        if (this.state.error) {
            return <div>Error: {this.state.error.message}</div>;
        }
        else if (this.state.rank) {
            return (
                <div className="rank-details-site">
                    <h1>{this.state.rank.nazwa}</h1>
                    {this.getPermissions()}
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

export default RankDetails;