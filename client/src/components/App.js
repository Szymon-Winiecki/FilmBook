import React, { useReducer } from 'react';

import '../style/App.css';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import Header from './Header';
import Footer from './Footer';
import HeaderUserSection from './HeaderUserSection';
import MoviesList from './MoviesList';
import MovieDetails from './MovieDetails'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserPanel from './UserPanel';

const sites = {
    MOVIES_LIST: '#movies',
    MOVIE_DETAILS: '#movie',
    SERIES_LIST: '#series',
    LOGIN_FORM: '#login',
    REGISTER_FORM: '#register',
    USER_PANEL: '#userpanel'
}

class App extends React.Component {

    navbar = [
        {
            label: "Filmy",
            onClick: () => { this.changeSite(sites.MOVIES_LIST); }
        },
        {
            label: "Seriale",
            onClick: () => this.changeSite(sites.SERIES_LIST)
        },
    ]

    constructor(props){
        super(props);

        this.state = {
            site: sites.LOGIN_FORM,
            user:{
                username: undefined,
                accessToken: undefined
            }
        };
    }

    async logOut(){
        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/logout`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });            

            if(!response.ok){
                this.setState({ 
                    error: response.status,
                });

                console.log(response.status);
            }
            else{
                console.log(response.status);

                this.changeUser(undefined, undefined);
                this.changeSite(sites.LOGIN_FORM);
            }

        } catch (err){
            console.log(err);
        }
    }

    changeUser(username, accessToken){
        this.setState({
            user:{
                username: username,
                accessToken: accessToken
            }
        });
    }

    changeSite(site){
        this.setState({
            site: site
        });
        if(document.location.hash != site){
            document.location.hash = site;
        }
    }

    getCurrentSite(){
        if(this.state.site == sites.MOVIES_LIST){
            return <MoviesList />;
        }
        else if(this.state.site == sites.LOGIN_FORM){
            return <LoginForm onRegister={() => this.changeSite(sites.REGISTER_FORM)} onUserLoggedIn={(username, accessToken) => { this.changeUser(username, accessToken); this.changeSite(sites.MOVIES_LIST); }}/>;
        }
        else if(this.state.site == sites.REGISTER_FORM){
            return <RegisterForm onLogin={() => this.changeSite(sites.LOGIN_FORM)} />;
        }
        else if(this.state.site == sites.USER_PANEL){
            return <UserPanel />
        }
        else if(this.state.site.substring(0,7) == sites.MOVIE_DETAILS + '/'){
            return <MovieDetails movieId={this.state.site.substring(7)}/>;
        }
        else{
            return <h1>404</h1>
        }
    }
    
    readAndChangeSite(){
        const site = document.location.hash;
        if(site && site.length > 1){
            this.changeSite(site)
        }
    }

    componentDidMount(){
        window.onpopstate = ()=> {
            this.readAndChangeSite();
        }

        this.readAndChangeSite();
    }

    render(){
        return (
            <UserContext.Provider value={this.state.user}>
            <div className='container'>
                <div className='header-container'>
                    <Header primaryText="Filmbook" navs={this.navbar} />
                </div>
                <div className='user-section-container'>
                    <HeaderUserSection onLogin={() => this.changeSite(sites.LOGIN_FORM)} onRegister={() => this.changeSite(sites.REGISTER_FORM)} onLogout={() => { this.logOut()} } onOpenUserPanel={() => { this.changeSite(sites.USER_PANEL); }} username={this.state.user.username}/>
                </div>
                <div className='main-container'>
                    {this.getCurrentSite()}
                </div>
                <div className='footer-container'>
                    <Footer author='Szymon Winiecki Maciej Wieczorek' year='2023'/>
                </div>
            </div>
            </UserContext.Provider>
        );
    }
}

export default App;