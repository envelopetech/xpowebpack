import React from 'react';
import classes from './Input.css';

import {PageType } from '../../../shared/utility';
import RichTextEditor from 'react-rte';
//import UploadDocs from '../Uploaddocs/Uploaddocs';
import { YearPicker} from 'react-dropdown-date';


const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Heading Large', style: 'header-one'},
      {label: 'Heading Medium', style: 'header-two'},
      {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };

  let show = true;
  let defaultseleclabel="--select";
  
const input = ( props ) => {  

      
    let inputselect = [{id: "", name: '--Select--'}];
    let inputElement = null;
    
    //let inputselect =null;

    let inputClasses= "";
    let labelclass= "";    
    let checkboxlabelclass="";
    let dropdownclass="";
    
    switch ( props.pageType ) {
        case ( PageType.moderator ):
            inputClasses=[classes.text_field];
            dropdownclass=[classes.text_field];
            labelclass = [classes.text_field_small]              
            if(props.elementType  === 'richtext')
            {
                inputClasses=[classes.richtext_field];
            }
            break;
        case ( PageType.myprofile ):
            inputClasses = [classes.InputElement];
            inputClasses.push(classes.inputfullwidth)
            dropdownclass = classes.InputElementSelect;
            labelclass = [classes.text_field_small] 
            checkboxlabelclass=classes.InputElementcheckbox; 
            

            break;
        default:
            inputClasses = [classes.InputElement];
            inputClasses.push(classes.inputfullwidth)
            dropdownclass = classes.InputElementSelect;
            labelclass = [classes.text_field_small] 
            break;

    }    
    inputClasses.push(classes.winput);
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }  
    if(props.is_show !== undefined) 
    {
        show= props.is_show;
    }
    switch ( props.elementType ) {        
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                required={props.required}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                required={props.required}
                onChange={props.changed} />;
            break;

        // case ( 'uploadimage' ):
        // inputElement =  <UploadDocs key={props.id}  
        //                 elementType={props.elementType}
        //                 elementConfig={props.elementConfig}
        //                 value={props.value}
        //                 preview={props.preview}
        //                 onSuccessImageupload={props.onSuccessupload} onErrorupload={props.onErrorupload}></UploadDocs>;
        //     break;
        case ( 'richtext' ):
        
        inputElement = <RichTextEditor
            className={inputClasses.join(' ')}           
            {...props.elementConfig}
            toolbarConfig={toolbarConfig}
            value={props.value}                    
            onChange={props.texteditchanged}
            />;
            break;
        case ( 'checkbox' ):        
            inputElement = (
                <label className={checkboxlabelclass}><input type="checkbox"  name="checkbox" checked={props.checked} onChange={props.checkboxchanged}/>
                    {props.checkboxlabel}
                </label>);
            break;
        case ( 'year' ):
            inputElement = <YearPicker
            defaultValue={defaultseleclabel}                    
            value={props.value}
            reverse={true}                    
            onChange={props.yearonchange}
            id={'year'}
            name={'year'}
            classes={dropdownclass.join(' ')}            
        />;
            break;

        case ( 'select' ):
            if(props.countrydata != null)
            {
                inputselect=  inputselect.concat(props.countrydata);   
            }            
            inputElement = (
                <select
                    className={dropdownclass.join(' ')}
                    value={props.value}
                    required={props.required}
                    onChange={props.changed}>
                    {inputselect.map(option => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            );
            break;    
        
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                required={props.required}
                value={props.value}
                onChange={props.changed} />;
    }

    let data= null;     
    if(show)
    {
        data= <div>
                <div className={classes.Input}>                    
                    {inputElement}
                </div>
                <div className={labelclass}>{props.label}</div>
            </div>
    }
    return (
        <div>{data}</div>
        
    );
};
export default input;