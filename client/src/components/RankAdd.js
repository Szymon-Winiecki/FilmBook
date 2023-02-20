import React from 'react';

import RankForm from './RankForm'

class RankAdd extends React.Component {

    constructor(props){
        super(props);

        this.state = {
        };
    }

    render(){
        return (
            <div className="rank-add-site">
                <h1>Dodaj rangę</h1>
                <RankForm />
            </div>
        );
    }
}

export default RankAdd;