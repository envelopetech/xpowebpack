import React from 'react';
import * as classshared from './classconst';
import { withRouter } from 'react-router';

class withoutback extends React.Component {
    
    render() {        
        return (
            <div className={classshared.explorewithoutback}>                
            </div>
        )
    }
};
export default React.memo(withRouter(withoutback));