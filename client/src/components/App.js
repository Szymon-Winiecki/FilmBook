import React from 'react';

import '../style/App.css';

import Header from './Header';
import Footer from './Footer';
import UserPanel from './UserPanel';
import MoviesList from './MoviesList';

const movies = [
    {
        id: 0,
        no: 1,
        localTitle: "Ojciec Chrzestny",
        originalTitle: "The Godfather",
        year: 1972,
        rate: 9.0
    },
    {
        id: 1,
        no: 2,
        localTitle: "Zielnona Mila",
        originalTitle: "The Green Mile",
        year: 1999,
        rate: 8.7
    },
    {
        id: 2,
        no: 3,
        localTitle: "Władca Pierścieni: Powrót króla",
        originalTitle: "The Lord of the Rings: The Return of the King",
        year: 2003,
        rate: 8.5
    },
]

const genres = [
    'horror',
    'akcji',
    'dramat',
    'komedia'
]

const navbar = [
    {
        label: "Filmy",
        onClick: () => { console.log("filmy") }
    },
    {
        label: "Seriale",
        onClick: () => { console.log("seriale") }
    },
]

class App extends React.Component {

    constructor(props){
        super(props);

        this.fetchMovies();
    }

    fetchMovies(){
        fetch('http://127.0.0.1:3520/api/movie').then((response) => response.json()).then((data) => console.log(data));
    }

    render(){
        return (
            <div className='container'>
                <div className='header-container'>
                    <Header primaryText="Filmbook" navs={navbar} />
                </div>
                <div className='user-panel-container'>
                    <UserPanel />
                </div>
                <div className='main-container'>
                    <MoviesList movies={movies} genres={genres}/>
                </div>
                <div className='footer-container'>
                    <Footer author='Szymon Winiecki Maciej Wieczorek' year='2023'/>
                </div>
            </div>
        );
    }
}

export default App;