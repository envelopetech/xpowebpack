import React from 'react';
import * as classshared from './classconst';
import Profilepic from '../UI/profilepic/profilepic';
import Button from '../UI/Button/Button' ;
import { ICONS, ButtonType ,ButtonText, commonplaceholder,textarearownumber,PageType,Post_Type,feed_type_report} from '../../shared/utility';
import Skeleton from 'react-loading-skeleton'; 
import axios from '../../store/axios-orders'; 
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Feedpost from './feedpost';
import YouTube from 'react-youtube';
import Reportpopup from './reportpopup';
import Modal from  "react-responsive-modal";//'../../UI/Modal/Modal';

const opts = {
    height: '390',
    width: '640',
    // playerVars: { // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1
    // }
  };

class usercommentslistitems extends React.Component {    

    constructor(props) {       
        super(props);          
        this.state={
            
        }        
    }
    
    render()
    {
             
        return(              

            <React.Fragment>                   
                    
               
            </React.Fragment>
        )  
    } 
}
//export default streamlineitems;

const mapDispatchToProps = dispatch => {
    // return {                           
    //     onuserlikessave: ( data ) => dispatch( actions.userlikessave( data ) ),         
    //     onuserunlikessave: ( data ) => dispatch( actions.userunlikessave( data ) ), 
    //     onusercommentssave: ( data ) => dispatch( actions.usercommentssave( data ) ), 
    //     onuserpostupdate: ( data ) => dispatch( actions.userpostupdate( data ) ), 
    //     on_feed_post_report_save: ( data ) => dispatch( actions.feed_post_report_save( data ) ), 
    // };
};
export default connect(null, mapDispatchToProps)(usercommentslistitems, axios );