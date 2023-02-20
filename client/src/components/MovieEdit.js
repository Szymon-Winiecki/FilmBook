import React from 'react';

import const_props from '../constant_properties';
import MovieForm from './MovieForm'

import '../style/MovieEdit.css';

class MovieEdit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            movie: {},
            form: {}
        };
    }

    fetchMovie(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie/${this.props.movieId}`)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    movie: data[0],
                });

                this.fetchGenres();
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    fetchGenres(){
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre/movie/${this.props.movieId}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.state.movie.genres = data.map(g => g.id);
                this.setState({
                    isLoaded: true,
                    movie: this.state.movie,
                    form: <MovieForm movie={this.state.movie} />,
                });
            },
            (error) => {
                console.log(error);
                this.state.movie.genres = [];
                this.setState({
                    isLoaded: true,
                    movie: this.state.movie,
                    form: <MovieForm movie={this.state.movie} />,
                });
            }
        );
    }

    update() {
        this.fetchMovie();
    }

    componentDidMount(){
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId) {
          this.update();
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
                <div className="movie-edit-site">
                    <h1>Edytuj informacje o filmie</h1>
                    {this.state.form}
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

export default MovieEdit;