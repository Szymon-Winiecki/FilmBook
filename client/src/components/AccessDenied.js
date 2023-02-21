import React from 'react';

import '../style/AccessDenied.css';

class AccessDenied extends React.Component {

    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="access-denied-site">
                <h1>Odmowa dostępu</h1>
            </div>
        );
    }
}

export default AccessDenied;