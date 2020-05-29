import React, { Component } from 'react';
import * as classshared from './classconst';
import {get_user_profile_tieups, sendtieupsrequest} from '../../actions/tieupsactions/dataactions';
import{ButtonType,label_text,constantvalues, ProfilepicType,  searchplaceholder,searchpagetype, range, PageType} from '../../shared/utility'
import Button from '../UI/Button/Button';
import 'react-responsive-modal/styles.css';
import TieupsItems from './tieupsitems';
import Spinner from '../UI/Spinner/Spinner';
import Search from '../UI/search/search'


class tieupslist extends Component {
    constructor(props) {
        super(props);        
        this.state={
            tieupsdata:null,
            tieupsmoredata:null,   
            totaltieupscount:null,            
            all_records:false,            
            is_show_allrecords:false,  
            tieups_requested:false,
            loading:false,
            totalshowlesscount:0,
            totalshowmorecount:0
        }
    }
    filldata(all_records)
    {
        var data= get_user_profile_tieups(all_records,this.props.otheruserid)        
        data.then(res=>
        {              
            if(res !== undefined)
            {                  
                if(res.data[0]["error"] === undefined && res.data[0].length > 0)
                {                   
                    if(res.data[1] !== undefined ) 
                    {
                        this.setState( { totaltieupscount:res.data[1]});
                    }
                    if(all_records)              
                    {
                        this.setState( { totalshowmorecount:res.data[0].length, tieupsmoredata:res.data[0], loading:false});                     
                    }
                    else
                    {
                        this.setState( { totalshowlesscount:res.data[0].length, tieupsdata:res.data[0], loading:false});                                              
                    }
                }
                else{
                    this.setState( { loading:false});
                }                
            }                                       
        });          
    }
    componentDidMount(){   
        
        this.setState({loading:true})
        this.filldata(this.state.all_records);                        
    } 
    showmorerecord= (event) => {        
        event.preventDefault();
        this.setState({
            is_show_allrecords:true,           
        }) 
        
        this.setState({all_records: true}, () => {
            this.filldata(this.state.all_records);
        });
    }
    showlessrecord= (event) => {        
        event.preventDefault();
        this.setState({
            is_show_allrecords:false,           
        })       
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
                //this.setState({tieups_just_requested:true})
                this.setState({tieups_requested:true})
            }                                                    
                
        }).catch(error => 
        {               
        });
    }
    render()
    {          
        let spinner = null
        if (this.state.loading) {
            spinner = <Spinner />
        }
        let butonshowmoreless=null;        
       if(this.state.totaltieupscount !== null)
        {
            if(this.state.totaltieupscount > constantvalues.usertieupsdata)
            {
                let allotherrecords = parseInt(this.state.totaltieupscount, 10) - parseInt(constantvalues.usertieupsdata, 10) 
                if(this.state.is_show_allrecords)
                {
                    butonshowmoreless=<div className={classshared.showalllescenterdivtieups.join(' ')}> <Button btntype={ButtonType.showmorelesslink} 
                    clicked={this.showlessrecord}>{label_text.showlessrecord} {constantvalues.usertieupsdata} {label_text.records} <i className={classshared.uparrow.join(' ')}></i></Button></div>
                }
                else{
                    butonshowmoreless=<div className={classshared.showalllescenterdivtieups.join(' ')}> <Button btntype={ButtonType.showmorelesslink} 
                    clicked={this.showmorerecord}>{label_text.showallrecords} {allotherrecords} {label_text.records} <i className={classshared.downarrow.join(' ')}></i></Button></div>
                }  
            }
        }         
        let tieupsdeetail=[];
        let finalist=null;
        finalist=this.state.tieupsdata;                
        if(finalist !== null)
        {           
            if(finalist.length > 0)
            {
                finalist.map( (item,i)  => {                                       
                    if(item.user_tieups_data[0] === undefined || item.user_tieups_data[0] === null || item.user_tieups_data[0].length <= 0) return null;                         
                    let detail =                    
                    <TieupsItems id={item.user_tieups_data[0].id}
                    pagetype={PageType.userprofile}
                    userid={item.user_tieups_data[0].user_id}
                    otheruserid={this.props.otheruserid}                    
                    profile_pic_url={item.user_tieups_data[0].profile_pic_url}
                    name={item.user_tieups_data[0].name}
                    designation={item.user_tieups_data[0].work_as}
                    user_friend_status={item.user_tieups_data[0].user_friend_status}
                    location={item.user_tieups_data[0].location}
                    mutualtieupsdata={item.user_mutual_data[0]}
                    totalmutualtieupes={item.user_mutual_data[1]}
                    ProfilepicType={ProfilepicType.tieupsmediumpic}
                    mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}
                    tieups_requested={this.state.tieups_requested}
                    loggedin_userstatus={item.loggedin_userstatus}
                    tieups_just_requested={this.state.tieups_just_requested}
                    tieupsclickhandler= {(e) =>  this.tieupsclickhandler(e,i, item.user_tieups_data[0].user_id)}
                    ></TieupsItems>                                                         
                        return (
                            tieupsdeetail.push(
                            <React.Fragment>{detail}</React.Fragment>  
                            )
                        )                     
                });
            }
        }
        //#region If data null than skeleton display
        else{
            if(this.state.totalshowlesscount > 0)
            {
                tieupsdeetail = range(0, this.state.totalshowlesscount -1).map( (i)  => (
                    <TieupsItems pagetype={PageType.userprofile} ProfilepicType={ProfilepicType.tieupsmediumpic} mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}></TieupsItems>
                    ));
            }          
        }
        //#endregion
        let tieupsdeetailmore=[]; 
        let morelist=null;
        if(this.state.is_show_allrecords)
        {  
            morelist=this.state.tieupsmoredata                       
            if(morelist !== null)
            {
                if(morelist.length > 0)
                {
                    morelist.map( (item,i)  => {                        
                        if(item.user_tieups_data[0] === undefined || item.user_tieups_data[0] === null || item.user_tieups_data[0].length <= 0) return null;                          
                        let detail =                        
                        <TieupsItems id={item.user_tieups_data[0].id}
                        pagetype={PageType.userprofile}
                        user_friend_status={item.user_tieups_data[0].user_friend_status}
                        userid={item.user_tieups_data[0].user_id}
                        otheruserid={this.props.otheruserid}
                        profile_pic_url={item.user_tieups_data[0].profile_pic_url}
                        name={item.user_tieups_data[0].name}
                        designation={item.user_tieups_data[0].work_as}
                        location={item.user_tieups_data[0].location}
                        mutualtieupsdata={item.user_mutual_data[0]}
                        totalmutualtieupes={item.user_mutual_data[1]}
                        tieups_requested={this.state.tieups_requested}
                        ProfilepicType={ProfilepicType.tieupsmediumpic}
                        loggedin_userstatus={item.loggedin_userstatus}
                        tieups_just_requested={this.state.tieups_just_requested}
                        mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}
                        tieupsclickhandler= {(e) =>  this.tieupsclickhandler(e,i, item.user_tieups_data[0].user_id)}
                        ></TieupsItems>
                            return (
                                tieupsdeetailmore.push(
                                <React.Fragment>{detail}</React.Fragment>  
                                )
                            )                              
                    });
                }
            }
            //#region If data null than skeleton display
            else
            {
                if(this.state.totalshowmorecount > 0)
                {
                    tieupsdeetailmore = range(0, this.state.totalshowmorecount -1 ).map( (i)  => (
                        <TieupsItems pagetype={PageType.userprofile} ProfilepicType={ProfilepicType.tieupsmediumpic} mutualsmallimage={ProfilepicType.user_nav__user_photo_xsmall}></TieupsItems>
                        ));
                }          
            }
        //#endregion
        }        
        let showdivtieups=null;
        if(this.state.totaltieupscount !== null && this.state.totaltieupscount > 0)
        {
            showdivtieups= 
                <React.Fragment>
                    <div className={classshared.margin_t_b_25.join(' ')}>
                    <Search placeholder={searchplaceholder.headersearch} pagetype={searchpagetype.profiletieups}></Search>
                   <div className={classshared.margin_t_b_25}><h1 className={classshared.headertext.join(' ')}>Total Tieups ({this.state.totaltieupscount})</h1></div> 
                    <div className={classshared.cards}>
                        {tieupsdeetail}
                        {tieupsdeetailmore}
                        {butonshowmoreless}
                    </div></div>
                </React.Fragment> 
        } 
        return(                    
           <React.Fragment>  
               {spinner}             
                {showdivtieups}               
           </React.Fragment>
        )
    }
}
export default  tieupslist;