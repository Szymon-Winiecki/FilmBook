import React from 'react';

import const_props, { UserContext } from '../constant_properties';

import '../style/GenresPicker.css';

class GenresPicker extends React.Component {

    constructor(props){
        super(props);


        this.state = {
            genres: [],
            selected: this.props.selected?.length > 0  ? new Set(this.props.selected) : new Set()
        };
    }

    fetchAllGenres() {
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre`;
        fetch(url)
        .then((response) => response.json())
        .then(
            (data) => {
                data.forEach(genre => {
                    genre.selected = this.state.selected.has(genre.id);
                })
                this.setState({
                    genres: data
                });
            },
            (error) => {
                this.setState({
                    error
                });
            }
        );
    }

    componentDidMount(){
        this.fetchAllGenres();
    }

    toggleSelection(genre){
        if(this.state.selected.has(genre.id)){
            genre.selected = false;
            this.state.selected.delete(genre.id);
        } 
        else{
            genre.selected = true;
            this.state.selected.add(genre.id);
        }

        this.setState({
            genres: this.state.genres,
            selected: this.state.selected
        });

        this.props.onChange(Array.from(this.state.selected));
    }

    getGenres() {
        let genresElems = [];
        this.state.genres.forEach(genre => {
            genresElems.push(
                <div key={genre.id} className='picker-list-row' onClick={() => this.toggleSelection(genre)}>
                    <i className={genre.selected ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                    <span className='picker-row-label'>{genre.nazwa}</span>
                </div>
            );
        });
        return genresElems;
    }

    render(){
        return (
            <div className='genres-picker'>
                <div className='picker-list'>
                    {this.getGenres()}
                </div>
            </div>
        );
    }
}
GenresPicker.contextType = UserContext;

export default GenresPicker;
