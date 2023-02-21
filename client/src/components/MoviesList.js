import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';
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

        let selectedGenre = '';
        const genreSelectElem = document.getElementById('genre-select');
        if(genreSelectElem && genreSelectElem.selectedIndex > 0){
            selectedGenre = `genre=${genreSelectElem.value}`;
        }

        let selectedSort = '';
        const sortSelectElem = document.getElementById('sort-select');
        if(genreSelectElem){
            selectedSort = sortSelectElem.value;
        }

        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie?${selectedGenre}&${selectedSort}`).then((response) => response.json()).then((data) => {
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

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className='movies-list-site'>
                <h1 className='section-title'>Filmy</h1>
                {this.context?.permissions?.includes('add_movie') ? 
                    <input type='button' value='Dodaj film' className='s-input' onClick={() => {this.changeSite('#add/movie')}}/>
                : ''}
                <div className='movie-list-controlls'>
                    <div className='list-controll'>
                        <label htmlFor='genre-select' className='list-control-label'>Gatunek: </label>
                        <select id='genre-select' onChange={() => this.fetchMovies()}>
                            {this.getGenres()}
                        </select>
                    </div>
                    <div className='list-controll'>
                        <label htmlFor='sort-select' className='list-control-label'>Sortuj wg: </label>
                        <select id='sort-select' onChange={() => this.fetchMovies()}>
                            <option value='sortBy=srednia_ocen&sortDir=asc'>ocena (rosnąco)</option>
                            <option value='sortBy=srednia_ocen&sortDir=desc'>ocena (malejąco)</option>
                            <option value='sortBy=tytul_polski&sortDir=asc'>tytuł (rosnąco)</option>
                            <option value='sortBy=tytul_polski&sortDir=desc'>tytuł (malejąco)</option>
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
MoviesList.contextType = UserContext;

export default MoviesList;