import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import '../style/ChangePasswordForm.css';
import '../style/inputs.css';

class ChangePasswordForm extends React.Component {

    validateFields(){
        const inputTags = [
            'old-password-input',
            'new-password-input',
            'repeat-new-password-input',
        ]

        let valid = true;

        const newPassElem = document.getElementById("new-password-input");
        const repeatNewPassElem = document.getElementById("repeat-new-password-input");
        if(newPassElem.value != repeatNewPassElem.value){
            valid = false;
            repeatNewPassElem.setCustomValidity('Hasło nie jest identyczne');
        }
        else{
            repeatNewPassElem.setCustomValidity('');
        }

        inputTags.forEach((tag) => {
            const elem = document.getElementById(tag);
            elem.classList.add('validated');
            if(!elem.reportValidity()) valid = false;
        });

        return valid;
    }

    async changePassword(user){
        if(!this.validateFields()) return;

        const userData = {
            oldPassword: document.getElementById('old-password-input').value,
            newPassword: document.getElementById('new-password-input').value
        }

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/users/changepassword`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
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
                this.setState({
                    success: true
                });
            }

        } catch (err){
            console.log(err);
        }
    }

    getErrorMessage(error){
        const messages = {
            400: 'Niepoprawne dane',
            401: 'Nie masz uprawnień',
            403: 'Nie masz uprawnień',
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
            <div className='change-password-form'>
                <div title='min 6 znaków'>
                    <label htmlFor='old-password-input' className='s-intput'>stare hasło</label>
                    <input id='old-password-input' type="password" pattern='.{6,255}' required title='min 6 znaków' className='s-input'></input>
                </div>
                <div title='min 6 znaków'>
                    <label htmlFor='new-password-input' className='s-intput'>nowe hasło</label>
                    <input id='new-password-input' type="password" pattern='.{6,255}' required title='min 6 znaków' className='s-input'></input>
                </div>
                <div title='min 6 znaków'>
                    <label htmlFor='repeat-new-password-input' className='s-intput'>powtórz nowe hasło</label>
                    <input id='repeat-new-password-input' type="password" pattern='.{6,255}' required title='min 6 znaków' className='s-input'></input>
                </div>
                <input id='change-password-button' type="button" value='zmień hasło' onClick={() => this.changePassword(this.context)} className='s-input'></input>
                <span className='error-text'>{this.state?.error ? this.getErrorMessage(this.state.error) : ''}</span>
                <span className='success-text'>{this.state?.success ? 'hasło zostało zmienione' : ''}</span>
            </div>
        );
    }
}
ChangePasswordForm.contextType = UserContext;

export default ChangePasswordForm;