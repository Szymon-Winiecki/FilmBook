import React, { useReducer } from 'react';

import '../style/App.css';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import Header from './Header';
import Footer from './Footer';
import HeaderUserSection from './HeaderUserSection';
import MoviesList from './MoviesList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import UserPanel from './UserPanel';
import MovieDetails from './MovieDetails'
import MovieAdd from './MovieAdd';
import MovieEdit from './MovieEdit';
import PersonDetails from './PersonDetails'
import PersonAdd from './PersonAdd';
import PersonEdit from './PersonEdit';
import UsersList from './UsersList';
import RankAdd from './RankAdd';
import RankEdit from './RankEdit';


const sites = {
    MOVIES_LIST: '#movies',
    SERIES_LIST: '#series',
    LOGIN_FORM: '#login',
    REGISTER_FORM: '#register',
    USER_PANEL: '#userpanel',
    MOVIE_DETAILS: '#movie',
    MOVIE_ADD: '#add/movie',
    MOVIE_EDIT: '#edit/movie',
    PERSON_DETAILS: '#person',
    PERSON_ADD: '#add/person',
    PERSON_EDIT: '#edit/person',
    USERS_LIST: '#users',
    MOVIES_EDIT: '#edit/movies',
    RANK_ADD: '#add/rank',
    RANK_EDIT: '#edit/rank',
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
                this.changeUser(undefined, undefined);
                this.changeSite(sites.LOGIN_FORM);
            }

            this.changeUser(undefined);

        } catch (err){
            console.log(err);
        }
    }

    changeUser(username, accessToken, permissions){
        const user = {
            username: username,
            accessToken: accessToken,
            permissions: permissions,
        }
        this.setState({
            user: user
        });

        sessionStorage.setItem("user", JSON.stringify(user));
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
            return <LoginForm onRegister={() => this.changeSite(sites.REGISTER_FORM)} onUserLoggedIn={(username, accessToken, permissions) => { this.changeUser(username, accessToken, permissions); this.changeSite(sites.MOVIES_LIST); }}/>;
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
        else if(this.state.site == sites.MOVIE_ADD){
            return <MovieAdd />;
        }
        else if(this.state.site.substring(0,12) == sites.MOVIE_EDIT + '/'){
            return <MovieEdit movieId={this.state.site.substring(12)}/>;
        }
        else if(this.state.site.substring(0,8) == sites.PERSON_DETAILS + '/'){
            return <PersonDetails personId={this.state.site.substring(8)}/>;
        }
        else if(this.state.site == sites.PERSON_ADD){
            return <PersonAdd />;
        }
        else if(this.state.site.substring(0,13) == sites.PERSON_EDIT + '/'){
            return <PersonEdit personId={this.state.site.substring(13)}/>;
        }
        else if(this.state.site == sites.USERS_LIST){
            return <UsersList />;
        }
        else if(this.state.site == sites.MOVIES_EDIT){
            return <MoviesList edit={true} />;
        }
        else if(this.state.site == sites.RANK_ADD){
            return <RankAdd />;
        }
        else if(this.state.site.substring(0,11) == sites.RANK_EDIT + '/'){
            return <RankEdit rankId={this.state.site.substring(11)} />;
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

    restoreUser(){
        let savedUser = sessionStorage.getItem("user");
        if(savedUser && savedUser != ''){
            savedUser = JSON.parse(savedUser);
            this.setState({
                user: savedUser
            });
        }
    }

    componentDidMount(){
        this.restoreUser();

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