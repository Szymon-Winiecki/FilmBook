import React from 'react';

import const_props, { UserContext } from '../constant_properties';
import RankForm from './RankForm'

class RankEdit extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            rank: {},
            form: {}
        };
    }

    fetchRank(){
        fetch(`http://${const_props.API_ADDR}:${const_props.API_PORT}/api/rank/${this.props.rankId}`, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                Authentication: `Bearer ${this.context.accessToken}`
            },
            credentials: 'include'
        })
        .then((response) => response.json())
        .then(
            (data) => {
                this.setState({
                    isLoaded: true,
                    rank: data[0],
                    form: <RankForm rank={data[0]} />,
                    });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        );
    }

    update() {
        this.fetchRank();
    }

    componentDidMount(){
        this.update();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.rankId !== this.props.rankId) {
          this.update();
        }
      }

    render(){
        const { error, isLoaded, rank } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else if (rank) {
            return (
                <div className="rank-edit-site">
                    <h1>Edytuj rangę {this.props.rankId}</h1>
                    {this.state.form}
                </div>
            );
        }
        else {
            return (
                <h1>Nie ma takiej rangi</h1>
            );
        }
    }
}
RankEdit.contextType = UserContext;

export default RankEdit;