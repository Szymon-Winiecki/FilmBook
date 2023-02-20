import React from 'react';

import const_props from '../constant_properties';
import Rank from './Rank'
import '../style/RanksList.css';

class RanksList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            ranks: [],
            ranksLoaded: false
        };
    }

    getRank(rank){
        return (
            <Rank rank={rank} key={rank.id} />
        );
    }

    getRanks(){
        if(this.state.ranks == null){
            return <div>Brak wyników</div>
        }
        const ranks = [];
        this.state.ranks.forEach((rank, i) => {
            rank.no = i + 1;
            ranks.push(this.getRank(rank));
        });

        return ranks;
    }

    fetchRanks(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank`).then((response) => response.json()).then((data) => {
            this.setState({
                ranks: data,
                ranksLoaded: true
            });
        });
    }

    componentDidMount(){
        this.fetchRanks();
    }

    render(){
        return (
            <div className='ranks-list-site'>
                <h1 className='section-title'>Rangi</h1>
                <div className='rank-list-controlls'>
                    <div className='list-controll'>
                        <label htmlFor='sort-select' className='list-control-label'>Sortuj wg: </label>
                        <select id='sort-select' onChange={() => this.fetchRanks()}>
                            <option value='sortBy=nazwa&sortDir=asc'>nazwa (rosnąco)</option>
                            <option value='sortBy=nazwa&sortDir=desc'>nazwa (malejąco)</option>
                        </select>
                    </div>
                </div>
                <div className='ranks-list-container'>
                    <div className='ranks-list-header'>
                        <div className='no-header'>lp.</div>
                        <div className='name-header'>Nazwa</div>
                    </div>
                    <div className="ranks-list">
                        {this.getRanks()}
                    </div>
                </div>
            </div>
        );
    }
}

export default RanksList;