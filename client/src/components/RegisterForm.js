import React from 'react';

import const_props from '../constant_properties';

import '../style/RegisterForm.css';
import '../style/inputs.css';

class RegisterForm extends React.Component {

    validateFields(){
        const inputTags = [
            'username-input',
            'email-input',
            'password-input',
            'telephone-input',
            'birthdate-input'
        ]

        let valid = true;

        inputTags.forEach((tag) => {
            const elem = document.getElementById(tag);
            elem.classList.add('validated');
            if(!elem.reportValidity()) valid = false;
        });

        return valid;
    }

    async register(){
        if(!this.validateFields()) return;

        const userData = {
            username: document.getElementById('username-input').value,
            email: document.getElementById('email-input').value,
            password: document.getElementById('password-input').value
        }

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData)
            });

            /*console.log(response.status);
            console.log(response.ok);
            if(response.ok){
                const data = await response.json()
                console.log(data);
            }*/
            

            if(!response.ok){
                const message = await response.text();
                this.setState({ 
                    error: response.status,
                    errorMessage: message
                });
            }
            else{
                this.props.onLogin();
            }

        } catch (err){
            console.log(err);
        }
    }

    getErrorMessage(error){
        const messages = {
            400: 'Niepoprawne dane',
            409: 'Użytkownik o podanej nazwie już istnieje',
            500: 'Błąd serwera, spróbuj ponownie później'
        }

        if(messages[error]){
            if(error == 400){
                return `${messages[error]}(${this.state?.errorMessage})`;
            }
            return messages[error];
        }
        else{
            return 'Wystąpił nieznany błąd, przepraszamy';
        }
    }

    render(){
        return (
            <div className='register-form-site'>
                <div className='register-form-title'>
                    <h2>Rejestracja</h2>
                    <div>
                        <span>Masz już konto? zaloguj się </span>
                        <span className='s-input pseudo-link' onClick={this.props.onLogin}>tutaj</span>
                    </div>
                </div>
                <div className='register-form'>
                    <div title='min 3 znaki'>
                        <label htmlFor='username-input' className='s-intput'>nazwa użytkownika *</label>
                        <input id='username-input' type="text" pattern='[0-9,a-z,A-Z]{3,255}' required title='minimum 3 znaki, tylko cyfry, małe i duże litery, bez znaków diakrytycznych' className='s-input'></input>
                    </div>
                    <div>
                        <label htmlFor='email-input' className='s-intput'>email *</label>
                        <input id='email-input' type="email" pattern='/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;' required className='s-input'></input>
                    </div>
                    <div title='min 6 znaków'>
                        <label htmlFor='password-input' className='s-intput'>hasło *</label>
                        <input id='password-input' type="password" pattern='.{6,255}' required className='s-input'></input>
                    </div>
                    <div title='w formacie +48123123123'>
                        <label htmlFor='telephone-input' className='s-intput'>nr telefonu</label>
                        <input id='telephone-input' type="tel" pattern="[+]{1}[0-9]{1,3} [0-9]{3} [0-9]{3} [0-9]{3}" title='w formacie +48 123 123 123' className='s-input'></input>
                    </div>
                    <div>
                        <label htmlFor='birthdate-input' className='s-intput'>data urodzenia</label>
                        <input id='birthdate-input' type="date" className='s-input'></input>
                    </div>
                    <span>* - pola wymagane</span>
                    <input id='register-button' type="button" value='Zarejestruj się' onClick={() => this.register()} className='s-input'></input>
                </div>
                <span className='error-text'>{this.state?.error ? this.getErrorMessage(this.state.error) : ''}</span>
                
            </div>
        );
    }
}

export default RegisterForm;