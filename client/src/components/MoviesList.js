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
            <Movie key={movie.id.toString()} movie={movie} />
        );
    }

    getMovies(){
        if(this.props.movies == null){
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
        if(this.props.movies == null){
            return <option value='all'> wszystkie </option>
        }
        const movies = [];
        movies.push( <option value='all'> wszystkie </option> );
        this.state.genres.forEach(genre => {
            movies.push( <option value={genre.nazwa}> {genre.nazwa} </option> );
        });

        return movies;
    }

    fetchMovies(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie`).then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({
                movies: data
            });
        });
    }

    fetchGenres(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre`).then((response) => response.json()).then((data) => {
            console.log(data);
            this.setState({
                genres: data
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
                <h1 className='section-title'>Filmy</h1>
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