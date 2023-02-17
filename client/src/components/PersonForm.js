import React from 'react';

import const_props from '../constant_properties';
import '../style/PersonForm.css';

class PersonForm extends React.Component {

    constructor(props){
        super(props);
    }

    submit() {
        let personData = {
            'imie': document.querySelector('#person-first-name').value,
            'nazwisko': document.querySelector('#person-last-name').value,
            'data_urodzenia': document.querySelector('#person-date-of-birth').value,
            'opis': document.querySelector('#person-description').value
        };
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/${this.props.person ? 'update/' + this.props.person.id : ''}`;
        fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(personData)
            });
    }

    render(){
        return (
            <div className="person-form">
                <div>
                    <label htmlFor="person-first-name">Imie:</label>
                    <input type="text" id="person-first-name" key={this.props.person ? this.props.person.id : ""}
                        defaultValue={this.props.person ? this.props.person.imie : ""} />
                </div>

                <div>
                    <label htmlFor="person-last-name">Nazwisko:</label>
                    <input type="text" id="person-last-name" key={this.props.person ? this.props.person.id : ""}
                        defaultValue={this.props.person ? this.props.person.nazwisko : ""} />
                </div>

                <div>
                    <label htmlFor="person-date-of-birth">Data urodzenia:</label>
                    <input type="date" id="person-date-of-birth" key={this.props.person ? this.props.person.id : ""}
                        defaultValue={this.props.person ?  this.props.person.data_urodzenia.substr(0, 10) : ""} />
                </div>

                <div>
                    <label htmlFor="person-description">Opis:</label>
                    <textarea type="time" id="person-description" key={this.props.person ? this.props.person.id : ""}
                        defaultValue={this.props.person ? this.props.person.opis : ""}></textarea>
                </div>
                
                <div>
                    <input id='person-form-submit-button' type="button" value={this.props.person ? 'Aktualizuj' : 'Dodaj'} onClick={() => this.submit()}></input>
                </div>
            </div>
        );
    }
}

export default PersonForm;