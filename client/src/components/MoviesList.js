import React from 'react';

import '../style/MoviesList.css';
import Movie from './Movie';
import SortControls from './SortControls';

class MoviesList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: this.props.movies,
            sortField: "",
            sortDir: 0
        }
    }

    sortByString(a, b, dir){
        if(typeof a != 'string') a = a.toString();
        if(typeof b != 'string') b = b.toString();

        if(dir == 1) return a.localeCompare(b);
        if(dir == -1) return b.localeCompare(a);
        else return 0;
    }

    handleSort(field, dir){
        if(this.state.sortField == field && this.state.sortDir == dir){
            this.setState({
                sortField: "",
                sortDir: 0
            });
        }
        else{
            this.setState({
                sortField: field,
                sortDir: dir
            });
        }

        if(dir == 0) return;


        const sorted = [...this.state.movies].sort((a, b)  => {
            return this.sortByString(a[field], b[field], dir);
        });

        this.setState({
            movies: sorted
        });
        
    }

    getMovie(movie){
        return (
            <Movie key={movie.id.toString()} movie={movie} />
        );
    }

    getMovies(){
        if(this.state.movies == null){
            return <div>No results</div>
        }
        const movies = [];
        this.state.movies.forEach(movie => {
            movies.push(this.getMovie(movie));
        });

        return movies;
    }

    render(){
        const sortField = this.state.sortField;
        const sortDir = this.state.sortDir
        return (
            <div className='movies-list-container'>
                <div className='movies-list-header'>
                    <div className='no-header'>lp. <SortControls type="numbers" sortDir={ sortField=="no" ? sortDir : 0} onAsc={() => {this.handleSort("no", 1)}} onDesc={() => {this.handleSort("no", -1)}} /></div>
                    <div className='title-header'>tytuł <SortControls sortDir={ sortField=="title" ? sortDir : 0} onAsc={() => {this.handleSort("title", 1)}} onDesc={() => {this.handleSort("title", -1)}} /></div>
                    <div className='rate-header'>ocena <SortControls type="numbers" sortDir={ sortField=="rate" ? sortDir : 0} onAsc={() => {this.handleSort("rate", 1)}} onDesc={() => {this.handleSort("rate", -1)}} /></div>
                </div>
                <div className="movies-list">
                    {this.getMovies()}
                </div>
            </div>
        );
    }
}

export default MoviesList;