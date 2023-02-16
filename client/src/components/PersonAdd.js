import React from 'react';

import const_props from '../constant_properties';
import '../style/PersonAdd.css';
import PersonForm from './PersonForm'

class PersonAdd extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <div className="person-add-site">
                <h1>Dodaj osobę</h1>
                <PersonForm />
            </div>
        );
    }
}

export default PersonAdd;