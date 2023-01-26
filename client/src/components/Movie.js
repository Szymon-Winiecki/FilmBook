import React from 'react';

import '../style/Movie.css';

class Movie extends React.Component {

    render(){
        return (
            <div className="movie-row">
                <div className='no-field'> { this.props.movie.no }. </div>
                <div className='title-field'> { this.props.movie.title } </div>
                <div className='rate-field'> {this.props.movie.rate}/10 </div>
            </div>
        );
    }
}

export default Movie;