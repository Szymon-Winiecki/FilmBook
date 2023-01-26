import React from 'react';

import '../style/MoviesList.css';
import Movie from './Movie';
import SortControls from './SortControls';

class MoviesList extends React.Component {
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
        this.props.movies.forEach(movie => {
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
        this.props.genres.forEach(genre => {
            movies.push( <option value={genre}> {genre} </option> );
        });

        return movies;
    }

    render(){
        return (
            <div className='movies-list-site'>
                <h1 className='section-title'>Filmy</h1>
                <div className='movie-list-controlls'>
                    <div className='list-controll'>
                        <label for='genre-select' class='list-control-label'>Gatunek: </label>
                        <select id='genre-select'>
                            {this.getGenres()}
                        </select>
                    </div>
                    <div className='list-controll'>
                        <label for='sort-select' class='list-control-label'>Sortuj wg: </label>
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