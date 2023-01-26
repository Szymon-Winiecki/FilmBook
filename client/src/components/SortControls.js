import React from 'react';

import '../style/SortControls.css';

class SortControls extends React.Component {

    constructor(props) {
        super(props);

        this.icon = {
            asc: "bi bi-sort-alpha-down",
            desc: "bi bi-sort-alpha-down-alt"
        };

        if(this.props.type == "text"){
            this.icon = {
                asc: "bi bi-sort-alpha-down",
                desc: "bi bi-sort-alpha-down-alt"
            }
        }
        else if(this.props.type == "numbers"){
            this.icon = {
                asc: "bi bi-sort-numeric-down",
                desc: "bi bi-sort-numeric-down-alt"
            }
        }
    }

    render(){

        const sortDir = this.props.sortDir;

        return (
            <span>
                <i onClick={this.props.onAsc} className={this.icon.asc + (sortDir == 1 ? " sort-in-use" : " sort-unused")}></i>
                <i onClick={this.props.onDesc} className={this.icon.desc +  (sortDir == -1 ? " sort-in-use" : " sort-unused")}></i>
            </span>
        );
    }
}

export default SortControls;