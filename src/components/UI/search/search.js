import React from 'react';
import * as classshared from './classconst';
import {searchpagetype} from '../../../shared/utility'

const search  = (props) => {             

    let classname=classshared.search__input    

    switch ( props.pagetype ) {        
        case ( searchpagetype.header ):        
            classname = classshared.search__input
            break;        
        case ( searchpagetype.profiletieups ):        
            classname = classshared.search__input
            break;  
        case ( searchpagetype.explorewingsearch ):        
            classname = classshared.search__input
            break;                
        default:
            classname = classshared.search__input
    }       
    return(          
        <React.Fragment>
            <div className={classshared.search}>
                <input type="search" id="search" name="query" placeholder={props.placeholder} maxLength="256" required="" className={classname.join(' ')}/>
                <button className={classshared.search__button}>
                <i className={classshared.fontawesome_search.join(' ')}></i>                  
                </button>
            </div>
        </React.Fragment>        
    )            
}
export default search;

