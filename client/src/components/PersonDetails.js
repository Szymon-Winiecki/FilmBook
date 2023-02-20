import React from 'react';

import const_props from '../constant_properties';
import '../style/PersonDetails.css';

class PersonDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            person: {}
        };
    }

    fetchPerson(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/${this.props.personId}`)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    person: data[0]
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

    deletePerson() {
        const url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/delete/${this.props.personId}`;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status == 500)
                console.log("nie mozna uzunac osoby");
        })
        .catch((error) => {
            console.log(error);
        });

        this.changeSite('#people');
    }

    componentDidMount(){
        this.fetchPerson();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.personId !== this.props.personId) {
          this.fetchPerson();
        }
    }

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        const { error, isLoaded, person } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if (person) {
            return (
                <div className="person-details-site">
                    <h1>{person.imie} {person.nazwisko}</h1>
                    <span>{person.opis}</span>
                    <input type='button' value='Edytuj osobę' className='s-input' onClick={() => {this.changeSite(`#edit/person/${person.id}`)}}/>
                    <input type='button' value='Usuń osobę' className='s-input' onClick={() => this.deletePerson()}/>
                </div>
            );
        }
        else {
            return (
                <h1>Nie ma takiej osoby</h1>
            );
        }
    }
}

export default PersonDetails;