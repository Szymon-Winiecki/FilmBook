import React from 'react';

import const_props from '../constant_properties';
import '../style/PersonEdit.css';
import PersonForm from './PersonForm'

class PersonEdit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            person: {},
            form: {}
        };
    }

    fetchPerson(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/${this.props.personId}`)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    person: data[0],
                    form: <PersonForm person={data[0]} />,
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

    update() {
        this.fetchPerson();
    }

    componentDidMount(){
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.personId !== this.props.personId) {
          this.update();
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
                <div className="person-edit-site">
                    <h1>Edytuj osobę</h1>
                    {this.state.form}
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

export default PersonEdit;