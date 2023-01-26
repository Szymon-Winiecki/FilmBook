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
        title: "Ojciec Chrzestny",
        rate: 9.0
    },
    {
        id: 1,
        no: 2,
        title: "Zielona Mila",
        rate: 8.7
    },
    {
        id: 2,
        no: 3,
        title: "Władca Pierścieni: Powrót króla",
        rate: 8.5
    },
]

class App extends React.Component {
    render(){
        return (
            <div className='container'>
                <div className='header-container'>
                    <Header primaryText="Filmbook" secondaryText="njalepsza strona z filmami" />
                </div>
                <div className='user-panel-container'>
                    <UserPanel />
                </div>
                <div className='main-container'>
                    <MoviesList movies={movies}/>
                </div>
                <div className='footer-container'>
                    <Footer author='Szymon Winiecki Maciej Wieczorek' year='2023'/>
                </div>
            </div>
        );
    }
}

export default App;