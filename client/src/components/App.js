import React, { useReducer } from 'react';

import '../style/App.css';

import const_props from '../constant_properties'

import Header from './Header';
import Footer from './Footer';
import UserPanel from './UserPanel';
import MoviesList from './MoviesList';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const sites = {
    MOVIES_LIST: '#movies',
    SERIES_LIST: '#series',
    LOGIN_FORM: '#login',
    REGISTER_FORM: '#register'
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
            username: undefined,
            accessToken: undefined
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
            username: username,
            accessToken: accessToken
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
        else{
            return <h1>404</h1>
        }
    }

    componentDidMount(){
        window.onpopstate = ()=> {
            const site = document.location.hash;
            if(site && site.length > 1){
                this.changeSite(site)
            }
        }
    }

    render(){
        return (
            <div className='container'>
                <div className='header-container'>
                    <Header primaryText="Filmbook" navs={this.navbar} />
                </div>
                <div className='user-panel-container'>
                    <UserPanel onLogin={() => this.changeSite(sites.LOGIN_FORM)} onRegister={() => this.changeSite(sites.REGISTER_FORM)} username={this.state.username} onLogout={() => { this.logOut()} }/>
                </div>
                <div className='main-container'>
                    {this.getCurrentSite()}
                </div>
                <div className='footer-container'>
                    <Footer author='Szymon Winiecki Maciej Wieczorek' year='2023'/>
                </div>
            </div>
        );
    }
}

export default App;