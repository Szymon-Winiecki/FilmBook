import React from 'react';

import const_props from '../constant_properties'

import '../style/LoginForm.css';
import '../style/inputs.css';

class LoginForm extends React.Component {

    validateFields(){
        const inputTags = [
            'username-input',
            'password-input',
        ]

        let valid = true;

        inputTags.forEach((tag) => {
            const elem = document.getElementById(tag);
            elem.classList.add('validated');
            if(!elem.reportValidity()) valid = false;
        });

        return valid;
    }

    async login(){
        if(!this.validateFields()) return;

        const userData = {
            username: document.getElementById('username-input').value,
            password: document.getElementById('password-input').value
        }

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            });            

            if(!response.ok){
                const message = await response.text();
                this.setState({ 
                    error: response.status,
                    errorMessage: message
                });

                console.log(response.status);
                console.log(message);
            }
            else{
                const data = await response.json();
                console.log(data);

                this.props.onUserLoggedIn(userData.username, data.accessToken);
            }

        } catch (err){
            console.log(err);
        }
    }

    getErrorMessage(error){
        const messages = {
            400: 'Użytkownik o podanej nazwie nie istnieje lub hasło jest niepoprawne',
            401: 'Użytkownik o podanej nazwie nie istnieje lub hasło jest niepoprawne',
            500: 'Błąd serwera, spróbuj ponownie później'
        }

        if(messages[error]){
            return messages[error];
        }
        else{
            return 'Wystąpił nieznany błąd, przepraszamy';
        }
    }

    render(){
        return (
            <div className='login-form-site'>
                <div className='login-form-title'>
                    <h2>Logowanie</h2>
                    <div>
                        <span>Nie masz jeszcze konta? zarejestruj się </span>
                        <span className='s-input pseudo-link' onClick={this.props.onRegister}>tutaj</span>
                    </div>
                </div>
                <div className='login-form'>
                    <div>
                        <label htmlFor='username-input' className='s-intput'>nazwa użytkownika</label>
                        <input id='username-input' type="text" required className='s-input'></input>
                    </div>
                    <div title='min 6 znaków'>
                        <label htmlFor='password-input' className='s-intput'>hasło</label>
                        <input id='password-input' type="password" required className='s-input'></input>
                    </div>
                    <input id='login-button' type="button" value='Zaloguj się' onClick={() => this.login()} className='s-input'></input>
                </div>
                <span className='error-text'>{this.state?.error ? this.getErrorMessage(this.state.error) : ''}</span>
                
            </div>
        );
    }
}

export default LoginForm;