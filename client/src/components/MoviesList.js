import React from 'react';

import const_props from '../constant_properties';
import '../style/MoviesList.css';
import Movie from './Movie';

class MoviesList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            movies: [],
            genres: []
        };
    }

    getMovie(movie){
        return (
            <Movie key={movie.id} movie={movie} edit={this.props.edit} />
        );
    }

    getMovies(){
        if(this.state.movies == null){
            return <div>Brak wyników</div>
        }
        const movies = [];
        this.state.movies.forEach((movie, i) => {
            movie.no = i + 1;
            movie.rate = 9;
            movies.push(this.getMovie(movie));
        });

        return movies;
    }

    getGenres(){
        if(this.state.genres == null){
            return <option value='all'> wszystkie </option>
        }
        const genres = [];
        let k = 1;
        genres.push( <option value='all' key={k}> wszystkie </option> );
        this.state.genres.forEach(genre => {
            genres.push( <option value={genre.nazwa} key={++k}> {genre.nazwa} </option> );
        });

        return genres;
    }

    fetchMovies(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie`).then((response) => response.json()).then((data) => {
            this.setState({
                movies: data,
                moviesLoaded: true
            });
        });
    }

    fetchGenres(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre`).then((response) => response.json()).then((data) => {
            this.setState({
                genres: data,
                genresLoaded: true
            });
        });
    }

    componentDidMount(){
        this.fetchMovies();
        this.fetchGenres();
    }

    render(){
        return (
            <div className='movies-list-site'>
                <h1 className='section-title'>{this.props.edit ? "Zarządzanie filmami" : "Filmy"}</h1>
                <div className='movie-list-controlls'>
                    <div className='list-controll'>
                        <label htmlFor='genre-select' className='list-control-label'>Gatunek: </label>
                        <select id='genre-select'>
                            {this.getGenres()}
                        </select>
                    </div>
                    <div className='list-controll'>
                        <label htmlFor='sort-select' className='list-control-label'>Sortuj wg: </label>
                        <select id='sort-select'>
                            <option value='rate_asc'>ocena (rosnąco)</option>
                            <option value='rate_desc'>ocena (malejąco)</option>
                            <option value='title_asc'>tytuł (rosnąco)</option>
                            <option value='title_desc'>tytuł (malejąco)</option>
                        </select>
                    </div>
                </div>
                <div className='movies-list-container'>
                    <div className='movies-list-header'>
                        <div className='no-header'>lp.</div>
                        <div className='title-header'>tytuł</div>
                        <div className='rate-header'>ocena</div>
                    </div>
                    <div className="movies-list">
                        {this.getMovies()}
                    </div>
                </div>
            </div>
        );
    }
}

export default MoviesList;