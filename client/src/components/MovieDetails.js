import React from 'react';

import const_props from '../constant_properties';
import {extractYearFromDate} from '../helpers/helpers'
import '../style/MovieDetails.css';

class MovieDetails extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            movie: {}
        };
    }

    fetchMovie(){
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie/${this.props.movieId}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    movie: data[0]
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

    componentDidMount(){
        this.fetchMovie();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId) {
          this.fetchMovie();
        }
    }

    render(){
        const { error, isLoaded, movie } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if (movie) {
            return (
                <div className="movie-details-site">
                    <h1>{movie.tytul_polski} {extractYearFromDate(movie.data_swiatowej_premiery)}</h1>
                    <span>{movie.opis}</span>
                </div>
            );
        }
        else {
            return (
                <h1>Nie ma takiego filmu</h1>
            );
        }
    }
}

export default MovieDetails;