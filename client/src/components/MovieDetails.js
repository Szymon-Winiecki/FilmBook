import React from 'react';

import const_props, { UserContext } from '../constant_properties';
import {extractYearFromDate, extractDateFromDate, minutesToHoursAndMinutes} from '../helpers/helpers'

import '../style/MovieDetails.css';
import '../style/inputs.css';
import AddRateForm from './AddRateForm';

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
        ).then(() => {
            this.fetchDirector();
        });
    }
    
    fetchRates(){
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rate/movie/${this.props.movieId}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    rates: data
                })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    fetchGenres(){
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre/movie/${this.props.movieId}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    genres: data
                })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    fetchDirector(){
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/${this.state?.movie?.czlowiek_kina_id}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    director: data[0]
                })
            },
            (error) => {
                console.log(error);
            }
        );
    }

    fetchAll(){
        this.fetchMovie();
        this.fetchGenres();
        this.fetchRates();
    }

    deleteMovie() {
        const url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie/${this.props.movieId}`;
        fetch(url, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status == 500)
                console.log("nie mozna uzunac filmu");
            else if (response.status == 200)
                this.changeSite('#movies');
        })
        .catch((error) => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchAll();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.movieId !== this.props.movieId) {
          this.fetchAll();
        }
    }

    getGenres(genres){
        if(!genres || genres?.length == 0){
            return '';
        }
        let genresList = '';
        genres.forEach((genre, i) => {
            if(i == 0){
                genresList += genre.nazwa;
            }
            else{
                genresList += ', ' + genre.nazwa;
            }
        });

        return genresList;
    }

    deleteRate(rate) {
        const url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rate/${rate.rateid}`;
        fetch(url, {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include'
        })
        .then((response) => {
            if (response.status == 500)
                console.log("nie mozna uzunac oceny");
            else if (response.status == 200) {
                window.location.reload(false); // reload page
            }
            else {

            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    getRates(rates){
        if(!rates || rates?.length == 0){
            return 'Brak ocen';
        }

        let ratesList = [];
        rates.forEach((rate, i) => {
            ratesList.push(<div key={i} className='rate-container'>
                <span className='rate-rate'>{rate.ocena} / 10 <i className="bi bi-star-fill"></i></span>
                <span className='rate-description'>{rate.uzasadnienie}</span>
                <span className='rate-author'>{rate.autor}</span>
                {this.context?.permissions?.includes('delete_rate') ? 
                    <i className="bi bi-x-circle" onClick={(e) => {e.stopPropagation(); this.deleteRate(rate)}}></i>
                : ''}
            </div>);
        });

        return ratesList;
    }

    changeSite(site) {
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        const { error, isLoaded, movie, rates, genres, director } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if (movie) {
            return (
                <div className="movie-details-site">
                    <div className="movie-details-main-section">
                        <div className='movie-details-title-row'>
                            <h1>{movie.tytul_polski}</h1>
                            <span>({extractYearFromDate(movie.data_swiatowej_premiery)})</span>
                        </div>
                        <span className='movie-details-original-title'>{movie.tytul_orginalny}</span>
                        <div className='movie-details-genres'>{this.getGenres(genres)}</div>
                        <span className='movie-details-description'>{movie.opis}</span>
                        <div className='movie-details-details'>
                            <div className='movie-details-details-names'>
                                <span>Reżyser: </span>
                                <span>Premiera światowa: </span>
                                <span>Premiera polska: </span>
                                <span>Czas trwania: </span>
                            </div>
                            <div className='movie-details-details-values'>
                                <span>{director ? `${director.imie} ${director.nazwisko}` : 'brak danych'}</span>
                                <span>{movie.data_swiatowej_premiery ? extractDateFromDate(movie.data_swiatowej_premiery) : 'brak danych'}</span>
                                <span>{movie.data_polskiej_premiery ? extractDateFromDate(movie.data_polskiej_premiery) : 'brak danych'}</span>
                                <span>{movie.czas_trwania ? minutesToHoursAndMinutes(movie.czas_trwania) : 'brak danych'}</span>
                            </div>
                        </div>
                        <h2>Oceny widzów:</h2>
                        <div className='movie-details-rates'>{this.getRates(rates)}</div>
                        <h2>Oceń ten film:</h2>
                        <AddRateForm movie={movie} onRate={() => this.fetchAll()}/>
                    </div>
                    <div className='movie-details-side-section'>
                        <div className='movie-details-avg-rate'>
                            <i className="bi bi-star-fill"></i>
                            <span> {movie.srednia_ocen ? parseFloat(movie.srednia_ocen).toFixed(1) : '?'} / 10</span>
                        </div>
                        {this.context?.permissions?.includes('alter_movie') ? 
                            <input type='button' value='Edytuj film' id='edit-movie-button' className='s-input' onClick={() => {this.changeSite(`#edit/movie/${movie.id}`)}}/>
                        : ''}
                        {this.context?.permissions?.includes('delete_movie') ? 
                            <input type='button' value='Usuń film' id='delete-movie-button' className='s-input' onClick={() => this.deleteMovie()}/>
                        : ''}
                    </div>
                    
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
MovieDetails.contextType = UserContext;

export default MovieDetails;