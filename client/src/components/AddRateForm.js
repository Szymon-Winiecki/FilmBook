import React from 'react';

import const_props from '../constant_properties';
import { UserContext } from '../constant_properties';

import '../style/AddRateForm.css';
import '../style/inputs.css';

class AddRateForm extends React.Component {

    validateFields(){
        const inputTags = [
            'rate-input',
            'rate-description-input',
        ]

        let valid = true;

        inputTags.forEach((tag) => {
            const elem = document.getElementById(tag);
            elem.classList.add('validated');
            if(!elem.reportValidity()) valid = false;
        });

        return valid;
    }

    async rate(){
        const user = this.context;
        if(!this.props?.movie?.id) return;
        if(!this.validateFields()) return;

        const userData = {
            ocena: document.getElementById('rate-input').value,
            uzasadnienie: document.getElementById('rate-description-input').value,
            film_id: this.props.movie.id
        }

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rate`, {
                method: this.state?.override ? 'PUT' : 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include',
                body: JSON.stringify(userData)
            });
            
            if(!response.ok){
                const message = await response.text();
                this.setState({
                    success: undefined,
                    error: response.status,
                    errorMessage: message
                });
            }
            else{
                this.setState({
                    success: 'wystawiono ocenę',
                    error: undefined,
                    errorMessage: undefined
                });
                this.clearForm();
                this.props.onRate();
                this.getOwnRate();
            }

        } catch (err){
            console.log(err);
        }
    }

    async deleteRate(){
        const user = this.context;
        if(!this.props?.movie?.id) return;

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rate/movie/${this.props.movie.id}/my`, {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include',
            });
            
            if(!response.ok){
                const message = await response.text();
                this.setState({
                    success: undefined,
                    error: response.status,
                    errorMessage: message
                });
            }
            else{
                this.setState({
                    success: 'usunięto ocenę',
                    error: undefined,
                    errorMessage: undefined
                });
                this.clearForm();
                this.props.onRate();
                this.getOwnRate();
            }

        } catch (err){
            console.log(err);
        }
    }

    async getOwnRate(){
        const user = this.context;
        if(!this.props?.movie?.id) return;

        try{
            const response = await fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rate/movie/${this.props.movie.id}/my`, {
                method: 'GET',
                headers: { 
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${user.accessToken}`
                },
                credentials: 'include'
            });
            
            if(!response.ok){
                const message = await response.text();
                this.setState({
                    success: false,
                    error: response.status,
                    errorMessage: message
                });
            }
            else{
                const data = await response.json();
                if(data.length == 0){
                    this.setState({
                        override: false
                    });
                }
                else{
                    this.setState({
                        override: true
                    });

                    document.getElementById('rate-input').value = data[0].ocena;
                    document.getElementById('rate-description-input').value = data[0].uzasadnienie;
                }
            }

        } catch (err){
            console.log(err);
        }
    }

    clearForm(){
        const inputTags = [
            'rate-input',
            'rate-description-input',
        ]

        inputTags.forEach((tag) => {
            const elem = document.getElementById(tag);
            elem.classList.remove('validated');
            elem.value = '';
        });
    }

    getErrorMessage(error){
        const messages = {
            400: 'Niepoprawne dane',
            401: 'Nie masz uprawnień',
            403: 'Nie masz uprawnień',
            404: 'Nie możemy znaleźć zasobu',
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

    componentDidMount(){
        this.getOwnRate();
    }

    render(){
        if(this.context && this.context?.accessToken){
            return (
                <div className='add-rate-form'>
                    <div>
                        <label htmlFor='rate-input' className='s-intput'>ocena: * </label>
                        <input id='rate-input' type="number" min='0' max='10' required className='s-input'></input>
                    </div>
                    <div>
                        <label htmlFor='rate-description-input' className='s-intput'>uzasadnienie: </label>
                        <input id='rate-description-input' type="text" className='s-input'></input>
                    </div>
                    <span>* - pola wymagane</span>
                    <div>
                        <input id='add-rate-button' type="button" value={this.state?.override ? 'zmień ocenę' : 'oceń'} onClick={() => this.rate()} className='s-input'></input>
                        {this.state?.override ? <input id='add-rate-button' type="button" value='usuń' onClick={() => this.deleteRate()} className='s-input'></input> : ''}
                    </div>
                    <span className='error-text'>{this.state?.error ? this.getErrorMessage(this.state.error) : ''}</span>
                    <span className='success-text'>{this.state?.success ? this.state.success : ''}</span>
                </div>
            );
        }
        else{
            return (
                <div className='s-input pseudo-link' onClick={() => {document.location.hash = '#login'}}>Zaloguj się aby ocenić ten film</div>
            );
        }
        
    }
}
AddRateForm.contextType = UserContext;

export default AddRateForm;