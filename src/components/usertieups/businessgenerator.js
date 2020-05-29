import React, { Component } from 'react';
import * as classshared from './classconst';
import {get_newly_joined_users} from '../../actions/userprofile/dataactions';
import{ProfilepicType, PageType} from '../../shared/utility'
import Businessgeneratoritems from './businessgeneratoritems';
import Swiper from 'react-id-swiper';
import 'swiper/css/swiper.css';
import {sendtieupsrequest} from '../../actions/tieupsactions/dataactions';

const params = {
    slidesPerView: 3,
    //modules: [Pagination, Navigation],
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    spaceBetween: 10,
    //getSwiper: updateSwiper,
    //shouldSwiperUpdate:true,
    rebuildOnUpdate:true,
    observer: true
    }

class businessgenerator extends Component {
    constructor(props) {
        super(props);        
        this.state={
            userdata:null,
            tieups_just_requested:false,            
        }
    }    
    componentDidMount(){   
        var data= get_newly_joined_users()        
        data.then(res=>
        {              
            if(res !== undefined)
            { 
                if(res.data["error"] === undefined && res.data.length > 0)
                { 
                    this.setState( { userdata:res.data});
                }
            }
        });               
    }    
    tieupsclickhandler(e, i, user_responder_id)
    { 
        e.preventDefault();               
        const data = {
            user_responder_id: user_responder_id,            
        };
        var dataadd= sendtieupsrequest(data)
        dataadd.then(res=>
        {                 
            if(res.data["error"] === undefined)               
            {
                this.setState({tieups_just_requested:true})
            }                                                    
                
        }).catch(error => 
        {               
        });
    }       

    render()
    {    
        
        let divrenderproductimage= null;
        let finalist=null;
        finalist=this.state.userdata;                
        if(finalist !== null)
        {
            if(finalist.length > 0)
            {



                let data=null;              
                data=  finalist.map((item,i) => {                
                        let islazyloading=false;
                        if(i > 3)
                        {
                            islazyloading = true;
                        }
                        let items=  <Businessgeneratoritems id={item.id}
                        currency_name={this.props.currency_name}
                        pagetype={PageType.explorepeople}
                        is_lazyloading={islazyloading}
                        userid={item.user_id}
                        otheruserid={this.state.otheruserid}                    
                        profile_pic_url={item.profile_pic_url}
                        name={item.name}
                        designation={item.work_as}
                        user_friend_status={item.user_friend_status}
                        location={item.location}
                        mutualtieupsdata={item.user_mutual_data[0]}
                        totalmutualtieupes={item.user_mutual_data[1]}
                        ProfilepicType={ProfilepicType.tieupsmediumpic}
                        mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}
                        tieups_requested={this.state.tieups_requested}
                        loggedin_userstatus={item.loggedin_userstatus}
                        tieups_just_requested={this.state.tieups_just_requested}
                        tieupsclickhandler= {(e) =>  this.tieupsclickhandler(e,i, item.user_id)}
                        ></Businessgeneratoritems>                        
                        return(
                            <div>{items}</div>   
                        )                       
                    }                
                )
                if(finalist.length > 3)
                {
                    divrenderproductimage=  <Swiper {...params}>
                    {data}
                    </Swiper>
                }
                else
                {
                    divrenderproductimage= <div className={classshared.flex}>{data}</div> 
                }                
            }
        }       
        
        return(                    
           <React.Fragment>               
                {divrenderproductimage}                
           </React.Fragment>
        )
    }
}
export default  businessgenerator;