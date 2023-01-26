import React from 'react';

import '../style/Movie.css';

class Movie extends React.Component {

    render(){
        return (
            <div className="movie-row">
                <div className='no-field'> { this.props.movie.no }. </div>
                <div className='title-field'> 
                    <div className='movie-title-up'>
                        <span className='movie-title-local'> { this.props.movie.localTitle } </span>
                        <span className='movie-title-year'>({ this.props.movie.year }) </span>
                    </div>
                    <span className='movie-title-original'>{ this.props.movie.originalTitle } </span>
                </div>
                <div className='rate-field'> {this.props.movie.rate.toFixed(1)}/10 <i class="bi bi-star-fill"></i></div>
            </div>
        );
    }
}

export default Movie;