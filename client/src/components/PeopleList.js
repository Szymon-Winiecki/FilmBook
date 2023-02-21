import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';
import Person from './Person'
import '../style/PeopleList.css';

class PeopleList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            people: [],
            peopleLoaded: false
        };
    }

    getPerson(person){
        return (
            <Person person={person} key={person.id}/>
        );
    }

    getPeople(){
        if(this.state.people == null){
            return <div>Brak wyników</div>
        }
        const people = [];
        this.state.people.forEach((person, i) => {
            person.no = i + 1;
            people.push(this.getPerson(person));
        });

        return people;
    }

    fetchPeople(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person`).then((response) => response.json()).then((data) => {
            this.setState({
                people: data,
                peopleLoaded: true
            });
        });
    }

    componentDidMount(){
        this.fetchPeople();
    }

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className='people-list-site'>
                <h1 className='section-title'>Ludzie kina</h1>
                {this.context?.permissions?.includes('add_person') ? 
                    <input type='button' value='Dodaj osobę' className='s-input' onClick={() => {this.changeSite('#add/person')}}/>
                : ''}
                <div className='person-list-controlls'>
                    <div className='list-controll'>
                        <label htmlFor='sort-select' className='list-control-label'>Sortuj wg: </label>
                        <select id='sort-select' onChange={() => this.fetchPeople()}>
                            <option value='sortBy=imie&sortDir=asc'>imie (rosnąco)</option>
                            <option value='sortBy=imie&sortDir=desc'>imie (malejąco)</option>
                            <option value='sortBy=nazwisko&sortDir=asc'>nazwisko (rosnąco)</option>
                            <option value='sortBy=nazwisko&sortDir=desc'>nazwisko (malejąco)</option>
                        </select>
                    </div>
                </div>
                <div className='people-list-container'>
                    <div className='people-list-header'>
                        <div className='no-header'>lp.</div>
                        <div className='first-name-header'>Imie</div>
                        <div className='last-name-header'>Nazwisko</div>
                    </div>
                    <div className="people-list">
                        {this.getPeople()}
                    </div>
                </div>
            </div>
        );
    }
}
PeopleList.contextType = UserContext;

export default PeopleList;