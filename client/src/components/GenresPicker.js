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

    addNewGenre(){
        const user = this.context;
        if(!user || !user.accessToken) return;

        let genreData = {
            nazwa: document.getElementById('new-genre-name').value,
        };
        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre`;
        fetch(url, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(genreData)
        })
        .then((response) => response.status)
        .then(
            (status) => {
                if(status >= 200 && status <= 299){
                    document.getElementById('new-genre-name').value = '';
                    this.fetchAllGenres();
                    this.setState({
                        error: undefined
                    });
                }
                else{
                    this.setState({
                        error: 'Nie udało się dodać nowego gatunku'
                    });
                    console.log('Nie udało się dodać nowego gatunku ', status);
                }
            },
            (error) => {
                console.log(error);
                this.setState({
                    error: 'Nie udało się dodać nowego gatunku'
                });
            }
        );
    }

    deleteGenre(genre){
        const user = this.context;
        if(!user || !user.accessToken) return;


        let url = `http://${const_props.API_ADDR}:${const_props.API_PORT}/api/genre/${genre.id}`;
        fetch(url, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include'
        })
        .then((response) => response.status)
        .then(
            (status) => {
                if(status >= 200 && status <= 299){
                    if(genre.selected) this.toggleSelection(genre);
                    this.fetchAllGenres();
                    this.setState({
                        error: undefined
                    });
                }
                else if(status == 409){
                    this.setState({
                        error: 'Gatunek jest używany, nie można go usunąć'
                    });
                }
                else{
                    this.setState({
                        error: 'Nie udało sie usunąć gatunku'
                    });
                    console.log('Nie udało sie usunąć gatunku ', status);
                }
            },
            (error) => {
                console.log(error);
                this.setState({
                    error: 'Nie udało sie usunąć gatunku'
                });
            }
        );
    }

    getGenres() {
        let genresElems = [];
        this.state.genres.forEach(genre => {
            genresElems.push(
                <div key={genre.id} className='picker-list-row' onClick={() => this.toggleSelection(genre)}>
                    <i className={genre.selected ? 'bi bi-check-circle-fill' : 'bi bi-circle'}></i>
                    <span className='picker-row-label'>{genre.nazwa}</span>
                    {this.context?.permissions?.includes('delete_genre') ? 
                        <i className="bi bi-x-circle" onClick={(e) => {e.stopPropagation(); this.deleteGenre(genre)}}></i>
                    : ''}
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
                {this.context?.permissions?.includes('add_genre') ?
                    <div className='picker-add-option'>
                        <input id='new-genre-name' type='text' className='s-input' placeholder='nowy gatunek'/>
                        <i className="bi bi-plus-circle" onClick={() => this.addNewGenre()}></i>
                    </div>
                : ''}
                <div className='picker-errors'>
                    {this.state.error}
                </div>
            </div>
        );
    }
}
GenresPicker.contextType = UserContext;

export default GenresPicker;
