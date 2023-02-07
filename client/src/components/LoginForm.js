import React from 'react';

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

    login(){
        if(this.validateFields()){
            //TODO
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
                    <div title='min 3 znaki'>
                        <label htmlFor='username-input' className='s-intput'>nazwa użytkownika</label>
                        <input id='username-input' type="text" pattern='[0-9,a-z,A-Z]{3,255}' required title='minimum 3 znaki, tylko cyfry, małe i duże litery, bez znaków diakrytycznych' className='s-input'></input>
                    </div>
                    <div title='min 6 znaków'>
                        <label htmlFor='password-input' className='s-intput'>hasło</label>
                        <input id='password-input' type="password" pattern='.{6,255}' required title='minimum 6 znaków' className='s-input'></input>
                    </div>
                    <input id='login-button' type="button" value='Zaloguj się' onClick={() => this.login()} className='s-input'></input>
                </div>
                
            </div>
        );
    }
}

export default LoginForm;