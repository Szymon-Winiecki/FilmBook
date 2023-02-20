import React from 'react';

import const_props, { UserContext } from '../constant_properties';

import DirectorPicker from './DirectorPicker';

import '../style/MovieForm.css';
import '../style/inputs.css'

class MovieForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            isLoaded: false,
            movieDirector: null,
            movieDirectorPicker: null
        };
    }

    fetchDirector(directorId) {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/person/${directorId}`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    movieDirector: data[0]
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

    submit() {

        const user = this.context;
        if(!user || !user.accessToken) return;

        let movieData = {
            'tytul_orginalny': document.querySelector('#movie-title-original').value,
            'tytul_polski': document.querySelector('#movie-title-local').value,
            'data_swiatowej_premiery': document.querySelector('#movie-release-year').value,
            'data_polskiej_premiery': document.querySelector('#movie-release-year-local').value,
            'czas_trwania': parseInt(document.querySelector('#movie-duration-h').value) * 60 + parseInt(document.querySelector('#movie-duration-m').value),
            'opis': document.querySelector('#movie-description').value,
            'czlowiek_kina_id': this.state.movieDirector?.id ? this.state.movieDirector.id : null
        };
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/movie/${this.props.movie ? '/' + this.props.movie.id : ''}`;
        fetch(url, {
                method: this.props.movie ? 'PUT' : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(movieData)
            });
    }

    componentDidMount(){
        if (this.props.movie)
            this.fetchDirector(this.props.movie.czlowiek_kina_id);
    }

    componentDidUpdate(prevProps) {
        if (this.props.movie && prevProps.movie.czlowiek_kina_id !== this.props.movie.czlowiek_kina_id) {
          this.fetchDirector(this.props.movie.czlowiek_kina_id);
        }
    }

    handleDirectorSelect = (director) => {
        this.setState({
            movieDirector: director,
            movieDirectorPicker: null
        });
    }

    pickDirector() {
        this.setState({movieDirectorPicker : <DirectorPicker onSelectDirector={this.handleDirectorSelect} />});
    }

    render(){
        if(this.context?.accessToken == undefined){
            return (
                <div className='s-input pseudo-link' onClick={() => {document.location.hash = '#login'}}>Zaloguj się aby {this.props.movie ? 'edytować' : 'dodać'} film</div>
            );
        }

        return (
            <div className="movie-form">
                <div>
                    <label htmlFor="movie-title-original">Tytuł oryginalny:</label>
                    <input className='s-input' type="text" id="movie-title-original" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie?.tytul_orginalny ? this.props.movie.tytul_orginalny : ""} />
                </div>

                <div>
                    <label htmlFor="movie-title-local">Tytuł polski:</label>
                    <input className='s-input' type="text" id="movie-title-local" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie?.tytul_polski ? this.props.movie.tytul_polski : ""} />
                </div>

                <div>
                    <label htmlFor="movie-release-year">Premiera światowa:</label>
                    <input className='s-input' type="date" id="movie-release-year" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie?.data_swiatowej_premiery ? this.props.movie.data_swiatowej_premiery.substring(0, 10) : ""} />
                </div>

                <div>
                    <label htmlFor="movie-release-year-local">Premiera polska:</label>
                    <input className='s-input' type="date" id="movie-release-year-local" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie?.data_polskiej_premiery ? this.props.movie.data_polskiej_premiery.substring(0, 10) : ""} />
                </div>

                <div>
                    <label htmlFor="movie-duration-h">Czas trwania:</label>
                    <div className='movie-duration-inputs-section'>
                        <input className='s-input movie-duration' type="number" min='0' id="movie-duration-h" key={this.props.movie ? this.props.movie.id : "1"}
                            defaultValue={this.props.movie?.czas_trwania ? Math.floor(this.props.movie.czas_trwania / 60) : 0} /><span> godz. </span>
                        <input className='s-input movie-duration' type="number" min='0' max='59' id="movie-duration-m" key={this.props.movie ? -this.props.movie.id : "2"}
                            defaultValue={this.props.movie?.czas_trwania ? this.props.movie.czas_trwania - (60 * Math.floor(this.props.movie.czas_trwania / 60)) : 0}/><span> min. </span>
                    </div>
                </div>

                <div>
                    <label htmlFor="movie-description">Opis:</label>
                    <textarea className='s-input' type="time" id="movie-description" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie?.opis ? this.props.movie.opis : null}></textarea>
                </div>

                <div>
                    <label htmlFor="movie-director">Reżyseria:</label>
                    <span id="movie-director" key={this.props.movie ? this.props.movie.id : ""}>
                        {this.state.movieDirector ? `${this.state.movieDirector.imie} ${this.state.movieDirector.nazwisko}` : ""}
                    </span>
                    <input className='s-input' type="Button" defaultValue="Wybierz" onClick={() => this.pickDirector()}></input>
                </div>
                
                <div>
                    {this.state.movieDirectorPicker}
                </div>

                <div>
                    <input className='s-input' id='movie-form-submit-button' type="button" value={this.props.movie ? 'Aktualizuj' : 'Dodaj'} onClick={() => this.submit()}></input>
                </div>
            </div>
        );
    }
}
MovieForm.contextType = UserContext;

export default MovieForm;