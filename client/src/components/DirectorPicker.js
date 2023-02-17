import React from 'react';

import const_props from '../constant_properties';
import '../style/DirectorPicker.css';

class DirectorPicker extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            directors: [],
            searchTerm: null,
            rangeStart: 0,
            rangeEnd: 10,
            error: null
        };
    }

    fetchDirectors() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    directors: data
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
        this.fetchDirectors();
    }

    getDirectors() {
        let d = [];
        this.state.directors.forEach(director => {
            d.push(
                <div key={director.id} className='director-list-row' onClick={() => this.props.onSelectDirector(director)}>
                    <span className='director-first-name'>{director.imie} </span>
                    <span className='director-last-name'>{director.nazwisko}</span>
                </div>
            );
        });
        return d;
    }

    render(){
        return (
            <div className='director-picker'>
                <div className='directors-list'>
                    {this.getDirectors()}
                </div>
            </div>
        );
    }
}

export default DirectorPicker;