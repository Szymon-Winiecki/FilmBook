import React from 'react';

import const_props from '../constant_properties';
import '../style/MovieForm.css';

class MovieForm extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            movieDirector: null
        };
    }

    submit() {
        let durationInMinutes =
            document.querySelector('#movie-duration-h') * 60+
            document.querySelector('#movie-duration-m')+
            document.querySelector('#movie-duration-s') / 60;
        let movieData = {
            'tytul_orginalny': document.querySelector('#movie-title-original'),
            'tytul_polski': document.querySelector('#movie-title-local'),
            'data_swiatowej_premiery': document.querySelector('#movie-release-year'),
            'data_polskiej_premiery': document.querySelector('#movie-release-year-local'),
            'czas_trwania': durationInMinutes,
            'opis': document.querySelector('#movie-description'),
            'czlowiek_kina_id': this.state.movieDirector
        };
        const response = fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(movieData)
            });
    }

    render(){
        return (
            <div className="movie-form">
                <div>
                    <label htmlFor="movie-title-original">Tytuł oryginalny:</label>
                    <input type="text" id="movie-title-original" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie ? this.props.movie.tytul_orginalny : ""} />
                </div>

                <div>
                    <label htmlFor="movie-title-local">Tytuł polski:</label>
                    <input type="text" id="movie-title-local" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie ? this.props.movie.tytul_polski : ""} />
                </div>

                <div>
                    <label htmlFor="movie-release-year">Premiera światowa:</label>
                    <input type="date" id="movie-release-year" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie ? this.props.movie.data_swiatowej_premiery.substring(0, 10) : ""} />
                </div>

                <div>
                    <label htmlFor="movie-release-year-local">Premiera polska:</label>
                    <input type="date" id="movie-release-year-local" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie ? this.props.movie.data_polskiej_premiery.substring(0, 10) : ""} />
                </div>

                <div>
                    <label htmlFor="movie-duration-h">Czas trwania:</label>
                    <input type="number" id="movie-duration-h" /><span> godz. </span>
                    <input type="number" id="movie-duration-m" /><span> min. </span>
                    <input type="number" id="movie-duration-s" /><span> sec.</span>
                </div>

                <div>
                    <label htmlFor="movie-description">Opis:</label>
                    <textarea type="time" id="movie-description" key={this.props.movie ? this.props.movie.id : ""}
                        defaultValue={this.props.movie ? this.props.movie.opis : null}></textarea>
                </div>

                <p>
                    <label htmlFor="">Reżyseria:</label>
                </p>
            </div>
        );
    }
}

export default MovieForm;