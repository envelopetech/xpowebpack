import React, { Component } from 'react';
import * as classshared from '../../commoncss/classconst';
import {getalleducationdetail} from '../../../actions/userprofile/dataactions';
import{titleheading,ButtonType,label_text,constantvalues,nodatatext_image_configuration, nodatatext_message,  ICONS, range, ProfilepicType, customPopUp} from '../../../shared/utility'
import Button from '../../UI/Button/Button';
import Educationdetailitems from './educationdetailitems';
import Modal from  "react-responsive-modal";//'../../UI/Modal/Modal';
import 'react-responsive-modal/styles.css';
import Educationdetailedit from './educationdetailedit';
import Nodatamessage from '../../nodatamessage/nodatamessage'
import nodataimage from '../../../assets/images/nodatafound.svg';
import shortid from  "shortid";

class educationdetail extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);        
        this.state={
            educationdata:null,
            educationmoredata:null,
            is_editmode:props.is_editmode,
            all_records:false,
            is_show_allrecords:false,  
            is_open_add_edit_popup:false,
            totalcount:null,
            //otheruserid:props.otheruserid,
            totalrowcount:0
        }
    }
    filldata(all_records)
    {
        var data= getalleducationdetail(all_records, this.props.otheruserid)        
        data.then(res=>
        {              
            if(res !== undefined)
            {                  
                if(res.data[0]["error"] === undefined)
                {   
                    if(res.data[1] !== undefined)
                    {
                        this.setState( { totalcount:res.data[1]});
                    }
                    if(all_records)              
                    {
                        this.setState( { educationmoredata:res.data[0]});
                    }
                    else
                    {
                        this.setState({totalrowcount:res.data[0].length, educationdata:res.data[0]})                                                                    
                        
                    }
                }                
            }                                       
        });          
    }
    componentDidMount(){  
        this._isMounted = true;      
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
       
    editpopuphandler= (event) => {
        event.preventDefault();
        this.setState({is_open_add_edit_popup: true});
    }

    closeeditpopuphandler= () => {
        this.setState( { is_open_add_edit_popup: false } );
        this.filldata(this.state.all_records); 
    } 
    componentWillUnmount() {
        this._isMounted = false;
      }

    render()
    {  
      
        let showeditbutton=null; 
        let butonshowmoreless=null;       
        if(this.props.is_editmode)
        {
            showeditbutton = <div className={classshared.margin_l_m}><Button btntype={ButtonType.edit_mode_button_profile} clicked={this.editpopuphandler} svgclass={classshared.icon_15_white_margin_l_0.join(' ')} icon={ICONS.NEWMESSAGE}></Button></div> 
        }          
        if(this.state.totalcount !== null)
        {
            if(parseInt(this.state.totalcount, 10) > parseInt(constantvalues.sidebarrecordcount, 10))
            {
                let allotherrecords = parseInt(this.state.totalcount, 10) - parseInt(constantvalues.sidebarrecordcount, 10) 
                if(this.state.is_show_allrecords)
                {
                    butonshowmoreless=<div className={classshared.showalllescenterdiv.join(' ')}> <Button btntype={ButtonType.showmorelesslink} 
                    clicked={this.showlessrecord}>{label_text.showlessrecord} {constantvalues.sidebarrecordcount} {label_text.records} <i className={classshared.uparrow.join(' ')}></i>
                    </Button></div>
                }
                else{
                    butonshowmoreless=<div className={classshared.showalllescenterdiv.join(' ')}> <Button btntype={ButtonType.showmorelesslink} 
                    clicked={this.showmorerecord}>{label_text.showallrecords} {allotherrecords} {label_text.records} <i className={classshared.downarrow.join(' ')}></i></Button></div>
                }  
            }
        }
       
        let list=[];
        list = this.state.educationdata;        
        let educationdetail=null; 
        if(list !== null)
        {            
            if(list.length > 0)
            {
                educationdetail = list.map( (item,i)  => (
                    <Educationdetailitems 
                        key={item.id} 
                        id={item.id} 
                        name={item.name} 
                        college_logo_url={item.college_logo_url} 
                        college_name={item.college_name}
                        year_from={item.year_from} 
                        year_to={item.year_to} 
                        type={ProfilepicType.user_nav__user_photo_xsmall}>
                    </Educationdetailitems>
                ));
            }
            else{
                educationdetail = 
                    <Nodatamessage imagesource={nodataimage} 
                        type={nodatatext_image_configuration.sidebarworkhistory} 
                        nodata_message={nodatatext_message.noeducationdetail}
                        btntype={ButtonType.edit_mode_button_profile}
                        svgclassname={classshared.icon_15_white_margin_r_0.join(' ')}
                        ishow ={true}
                        icons={ICONS.PLUS} addnewrecordhandler={this.addnewrecordhandler}>
                    </Nodatamessage>
            }
        }
        else{
            if(this.state.totalrowcount > 0)
            {
                educationdetail = range(0, this.state.totalrowcount -1 ).map( (i)  => (
                    <Educationdetailitems key={shortid.generate()}></Educationdetailitems>
                    ));
            }                 
            else{
                educationdetail = <Educationdetailitems key={shortid.generate()}></Educationdetailitems>                    
            }
        }       
        let educationdetailmore=null; 
        if(this.state.is_show_allrecords)
        {
            let listmore=null;
            listmore = this.state.educationmoredata;                 
            if(listmore !== null)
            {
                if(listmore.length > 0)
                {
                    educationdetailmore = listmore.map( (item,i)  => (
                        <Educationdetailitems 
                            key={item.id} 
                            id={item.id} 
                            name={item.name} 
                            college_name={item.college_name}
                            year_from={item.year_from} 
                            year_to={item.year_to} 
                            college_logo_url={item.college_logo_url} 
                            type={ProfilepicType.user_nav__user_photo_xsmall}>
                        </Educationdetailitems>
                    ));
                }
            }
        }       
        return(                    
            <React.Fragment>
                <Modal open={this.state.is_open_add_edit_popup} styles={customPopUp}
                    onClose={this.closeeditpopuphandler} center showCloseIcon={false}>
                        <Educationdetailedit closemodal={this.closeeditpopuphandler}></Educationdetailedit>                        
                </Modal>
                <div className={classshared.sidebar__user_work_education}>                 
                    <div  className={classshared.sidebar__user_stats.join(' ')}>                       
                        <div className={classshared.sidebar__user_details_left.join(' ')}>
                            <div className={classshared.title}>
                                <div className={classshared.icon_wrapper}>
                                   <i className={classshared.fontawesome_graduation.join(' ')}></i>
                                </div>
                                <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>{titleheading.education}</div>
                            </div>
                        </div>    
                        <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>
                            {showeditbutton} 
                        </div>            
                    </div>
                    <div id="sidebarbottomlist" className={classshared.line}></div>
                    {educationdetail}
                    {educationdetailmore}
                    {butonshowmoreless}      
                </div>      
            </React.Fragment>
        )
    }
}
export default  educationdetail;