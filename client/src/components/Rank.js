import React from 'react';

import '../style/Rank.css';

class Rank extends React.Component {

    constructor(props){
        super(props);

        this.state = { };
    }

    changeSite() {
        let site = `#rank/${this.props.rank.id}`;
        if(document.location.hash != site) {
            document.location.hash = site;
        }
    }

    render(){
        return (
            <div className="rank-row" onClick={() => this.changeSite()}>
                <div className='no-field'> { this.props.rank.no }. </div>
                <div className='name-field'> { this.props.rank.nazwa } </div>
            </div>
        );
    }
}

export default Rank;