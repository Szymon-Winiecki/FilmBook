import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';
import '../style/RankForm.css';
import PermissionPicker from './PermissionPicker';

class RankForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            rankPermissions: [],
            rankPermissionPicker: null
        };
    }

    fetchRankPermissions() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/permission/${this.props.rank.id}`;
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
                    isLoaded: true,
                    rankPermissions: data
                    });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    submit() {
        let rankData = {
            'nazwa': document.querySelector('#rank-name').value,
            'uprawnienia': this.state.rankPermissions.map((elem) => elem.nazwa)
        };
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank/${this.props.rank ? '/' + this.props.rank.id : ''}`;
        fetch(url, {
                method: this.props.rank ? 'PUT' : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${this.context.accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(rankData)
            })
        .then(() => {
            this.changeSite('#ranks');
        });
    }

    componentDidMount(){
        if (this.props.rank)
            this.fetchRankPermissions();
    }

    componentDidUpdate(prevProps) {
        if (this.props.rank && prevProps.rank.id !== this.props.rank.id) {
          this.fetchRankPermissions();
        }
    }

    handlePermissionRemove = e => {
        e.preventDefault();
        let permIdx = this.state.rankPermissions.findIndex(element => element.nazwa === e.target.id);
        if (permIdx > -1)
        {
            this.state.rankPermissions.splice(permIdx, 1);
            this.forceUpdate();
        }
    }

    getPermissions() {
        if (!this.state.rankPermissions)
            return
        
        let p = [];
        this.state.rankPermissions.forEach(permission => {
            p.push(
                <div key={permission.nazwa} className='permissions-list-row'>
                    <span className='permission-name'>{permission.nazwa} </span>
                    <span className='permission-description'>{permission.opis}</span>
                    <input type="Button" id={permission.nazwa} defaultValue="Usuń" onClick={e => this.handlePermissionRemove(e)}></input>
                </div>
            );
        });
        return p;
    }

    handlePermissionSelect = (permission) => {
        this.state.rankPermissions.push(permission);
        this.setState({
            rankPermissionPicker: null
        });
    }

    pickPermission() {
        this.setState({rankPermissionPicker : <PermissionPicker exclude={this.state.rankPermissions} onSelectPermission={this.handlePermissionSelect} />});
    }

    render(){
        return (
            <div className="rank-form">
                
                <div>
                    <label htmlFor="rank-name">Nazwa:</label>
                    <input type="text" id="rank-name" key={this.props.rank ? this.props.rank.id : ""}
                        defaultValue={this.props.rank ? this.props.rank.nazwa : ""} />
                </div>

                <div>
                    <label htmlFor="rank-permissions">Uprawnienia:</label>
                    {this.getPermissions()}
                    <input type="Button" defaultValue="Dodaj uprawnienie" onClick={() => this.pickPermission()}></input>
                </div>
                
                <div>
                    {this.state.rankPermissionPicker}
                </div>

                <div>
                    <input id='rank-form-submit-button' type="button" value={this.props.rank ? 'Aktualizuj' : 'Dodaj rangę'} onClick={() => this.submit()}></input>
                </div>
            </div>
        );
    }
}
RankForm.contextType = UserContext;

export default RankForm;