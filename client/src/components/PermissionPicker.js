import React from 'react';

import const_props from '../constant_properties';
import '../style/PermissionPicker.css';

class PermissionPicker extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            permissions: [],
            searchTerm: null,
            rangeStart: 0,
            limit: 10,
            error: null
        };
    }

    fetchAllPermissions() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/permission`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    permissions: data
                    });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        );
    }

    componentDidMount(){
        this.fetchAllPermissions();
    }

    getPermissions() {
        let p = [];
        this.state.permissions.forEach(permission => {
            const found = this.props.exclude.findIndex(elem => elem.nazwa === permission.nazwa);
            if (found === -1) // permission not excluded
                p.push(
                    <div key={permission.nazwa} className='permissions-list-row' onClick={() => this.props.onSelectPermission(permission)}>
                        <span className='permission-name'>{permission.nazwa} </span>
                        <span className='permission-description'>{permission.opis}</span>
                    </div>
                );
        });
        return p;
    }

    render(){
        return (
            <div className='permission-picker'>
                <div className='permissions-list'>
                    {this.getPermissions()}
                </div>
            </div>
        );
    }
}

export default PermissionPicker;
