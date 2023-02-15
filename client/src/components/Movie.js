import React from 'react';

import '../style/Movie.css';
import {extractYearFromDate} from '../helpers/helpers'

class Movie extends React.Component {

    constructor(props){
        super(props);

        const year = extractYearFromDate(this.props.movie.data_swiatowej_premiery);

        this.state = { year: year };
    }

    handleClick() {
        let site = `#movie/${this.props.movie.id}`;
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className="movie-row" onClick={() => this.handleClick()}>
                <div className='no-field'> { this.props.movie.no }. </div>
                <div className='title-field'> 
                    <div className='movie-title-up'>
                        <span className='movie-title-local'> { this.props.movie.tytul_polski } </span>
                        <span className='movie-title-year'>{this.state.year ? `(${this.state.year})` : '' } </span>
                    </div>
                    <span className='movie-title-original'>{ this.props.movie.tytul_orginalny } </span>
                </div>
                <div className='rate-field'> {this.props.movie.rate.toFixed(1)}/10 <i className="bi bi-star-fill"></i></div>
            </div>
        );
    }
}

export default Movie;