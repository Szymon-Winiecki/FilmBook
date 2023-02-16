import React from 'react';

import const_props from '../constant_properties';
import '../style/MovieForm.css';
import MovieForm from './MovieForm'

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
                    isLoaded: true,
                    movie: data[0],
                    form: <MovieForm movie={data[0]} />,
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
                    <h1>Edytuj film {this.props.movieId}</h1>
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