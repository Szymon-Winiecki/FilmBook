import React from 'react';

import '../style/MovieAdd.css';
import MovieForm from './MovieForm'

class MovieAdd extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <div className="movie-add-site">
                <h1>Dodaj film</h1>
                <MovieForm />
            </div>
        );
    }
}

export default MovieAdd;