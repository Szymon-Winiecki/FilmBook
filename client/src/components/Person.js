import React from 'react';

import '../style/Person.css';

class Person extends React.Component {

    constructor(props){
        super(props);

        this.state = { };
    }

    changeSite() {
        let site = `#person/${this.props.person.id}`;
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className="person-row" onClick={() => this.changeSite()}>
                <div className='no-field'> { this.props.person.no }. </div>
                <div className='first-name-field'> { this.props.person.imie } </div>
                <div className='last-name-field'> { this.props.person.nazwisko } </div>
            </div>
        );
    }
}

export default Person;