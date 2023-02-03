import React from 'react';

import '../style/Movie.css';

class Movie extends React.Component {

    constructor(props){
        super(props);

        let d = new Date();
        d.setTime(Date.parse(this.props.movie.data_swiatowej_premiery));
        const year = (!isNaN(d.getFullYear())) ? d.getFullYear() : undefined;

        this.state = { year: year };
    }

    render(){
        return (
            <div className="movie-row">
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