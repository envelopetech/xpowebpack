import React, {Component} from 'react';
import * as classshared from './classconst';
import Button from '../../UI/Button/Button';//
import {update_exhibitor_intro_detail} from '../../../actions/exhibitor/dataactions';

class introductionitems extends Component {
    constructor(props) {
        super(props);        
        this.state={           
            is_show_about_edit_fields:false,
            title:this.props.title,
            detail_description:this.props.detail_description            
        }
    } 
     editfieldsshowhandler= (event) => {
        event.preventDefault();
        this.setState({is_show_about_edit_fields: true});
    } 
    closeeditmodehandler= (event) => {
        event.preventDefault();
        this.setState({is_show_about_edit_fields: false});
    } 
    titlechange= (event) => {
        event.preventDefault();
        this.setState({title: event.target.value});
    } 
    descriptionchange= (event) => {
        event.preventDefault();
        this.setState({detail_description: event.target.value});
    }  
    saveexhibitorintroductition= (event) => {
        event.preventDefault();
        const dataval = {            
            id: this.props.id,  
            title:this.state.title,
            detail_description:this.state.detail_description,
            exhibitor_id:this.props.exhibitor_id
        };         
        var data= update_exhibitor_intro_detail(dataval)
        data.then(res=>
        {               
            if(res.data["error"] === undefined)
            {
                this.setState({ is_show_about_edit_fields:false }, () => {                    
                })
            }
        }); 
            
    } 
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.is_editmode === false) {
            return ({ is_show_about_edit_fields: false }) // <- this is setState equivalent
        }
        else
        {
            return null;
        }
    }    
    render()
    {
      
        let editdiv= null; 
        if(this.props.is_editmode)
        {    
            if(this.state.is_show_about_edit_fields)
            {
                editdiv =  
                    <div className={classshared.buttoncontainer}>
                        <div className={classshared.mar_r_m}><Button btntype={this.props.edit_mode_button_profile} buttontype="button" clicked={this.saveexhibitorintroductition} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.saveicon}></Button></div>
                        <div className={classshared.mar_r_m}><Button btntype={this.props.edit_mode_button_profile}  buttontype="button" clicked={this.closeeditmodehandler} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.crossicon}></Button></div>
                    </div>             
            }
            else
            {
                editdiv =   
                    <div className={classshared.margin_t_b_10.join(' ')}>
                        <Button btntype={this.props.edit_mode_button_profile} svgclass={classshared.icon_15_white_margin_r_0.join(' ')} icon={this.props.icon} clicked={this.editfieldsshowhandler}>
                        </Button>
                    </div>
            }                     
        }    
        return(         
            <div className={classshared.editable}>    
                <div  className={classshared.sidebar__user_stats.join(' ')}>                       
                    <div className={classshared.sidebar__user_details_left.join(' ')}>                               
                        {
                            this.state.is_show_about_edit_fields 
                            ?
                            (
                                <React.Fragment>                                       
                                    <input type="text" 
                                            className={classshared.input_box_edit_fields.join(' ')}                                                     
                                            required 
                                            value={this.state.title}
                                            onChange={this.titlechange}
                                    />                      
                                </React.Fragment>
                            ):
                            (
                                <React.Fragment> <div className={classshared.text_12_text_dark_intro_title.join(' ')}>{this.state.title}</div></React.Fragment>
                            )
                        }                      
                    </div>    
                    <div className={classshared.sidebar__user_stats_tenure_year.join(' ')}>                                
                        {editdiv}
                    </div>            
                </div>           
                {
                    this.state.is_show_about_edit_fields 
                    ?
                    (
                        <React.Fragment>                                       
                            <textarea type="text" 
                                    className={classshared.input_box_edit_fields.join(' ')}                                         
                                    required rows="15" 
                                    value={this.state.detail_description}
                                    cols="100" onChange={this.descriptionchange}/>                    
                        </React.Fragment>
                    ):
                    (
                        <React.Fragment><div className={classshared.text_12_text_dark_intro_description.join(' ')}>{this.state.detail_description}</div></React.Fragment>
                    )
                }                   
            </div>    
        )   
    }                                                                                                                    
}
export default introductionitems;