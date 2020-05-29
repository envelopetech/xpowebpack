import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import {get_trending_wings} from '../../../actions/wings/dataactions';
import{titleheading,ProfilepicType} from '../../../shared/utility'
import Sidebarwinglistitem from './sidebarwinglistitem';
import Icon from '../../UI/Icon/rocket';
// import Nodatamessage from '../../nodatamessage/nodatamessage'
// import nodataimage from '../../../assets/images/nodatafound.svg';
import shortid from  "shortid";

class sidebarwinglist extends Component {
    constructor(props) {
        super(props);        
        this.state={
            trendingwingdata:null,                
        }
    }    
    componentDidMount(){        
        var data= get_trending_wings()        
        data.then(res=>
        {              
            if(res !== undefined)
            {                  
                if(res.data["error"] === undefined)
                {   
                    
                    this.setState( { trendingwingdata:res.data});
                            
                }                
            }                                       
        });                            
    }  
    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextState.trendingwingdata !== this.state.trendingwingdata;
    // }
    render()
    {           
        let list=[];
        list = this.state.trendingwingdata;        
        let sidebartrending=[];           
        if(list !== null)
        {            
            if(list.length > 0)
            {
                    list.map( (item,i)  => {
                    let detail=null;
                    let totalwingster = null;
                    if (item.wings_users.length > 0)
                    {
                        totalwingster = item.wings_users[1]
                    }
                    detail= <Sidebarwinglistitem 
                        key={item.id} 
                        id={item.id} 
                        wing_pic_url={item.wing_pic_url}
                        title={item.title} 
                        location={item.city} 
                        type={ProfilepicType.user_nav__user_photo_small}
                        totalwingster={totalwingster}>
                    </Sidebarwinglistitem>
                    return (
                        sidebartrending.push(
                        <React.Fragment key={shortid.generate()}>{detail}</React.Fragment>  
                        )
                    )    
                });
            }            
        }           
        return(                    
            <React.Fragment>               
                <div className={classshared.sidebar__user_work_education}>                 
                    <div className={classshared.title}>
                        <div className={classshared.icon_wrapper}>
                            <Icon svgclass={classshared.sidebar_icon}></Icon>
                        </div>
                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{titleheading.trendingwings}</div>    
                    </div> 
                    <div id="sidebarbottomlist" className={classshared.line}></div>                     
                    {sidebartrending}
                </div>      
            </React.Fragment>
        )
    }
}
export default  sidebarwinglist;