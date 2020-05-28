import React from 'react';
import  * as classesshared from './classconst';
import Filestack from '../../FilestackUpload/FilestackUpload';
import {FilestackType, customPopUp} from '../../../shared/utility';
import downloadimage from '../../../assets/images/cloud-computing_1cloud-computing.png';
//import Modal from '../Modal/Modal';
import Modal from  "react-responsive-modal";//'../../UI/Modal/Modal';
import 'react-responsive-modal/src/styles.css';

class  uploaddocs extends React.Component { 
    constructor(props) {
        super(props);        
        this.toggle = this.toggle.bind(this);
        this.state = {openmodel: false};
      }
      toggle() {
        this.setState({ openmodel: true });        
      }
    // const options = {
    //     accept: ['application/pdf', "application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"]
    //     };    
    closedmodelhandler = () => {
        this.setState( { openmodel: false } );
    }
        
    render()
    {          
        let shofilesoption=null;
        let modeldata=null; 
        
        if(this.props.value !== null && this.props.value !== undefined)
        {
            // shofilesoption = <a onClick={this.toggle} className={classesshared.show_link}>Show Files</a>
            modeldata =  <Modal open={this.state.openmodel} styles={customPopUp}
                                onClose={this.closedmodelhandler} center >
                                     <iframe className={classesshared.iframeclass700}
                                            src={this.props.preview} title={this.props.label}>
                                    </iframe>                         
                                </Modal>    
        }
        shofilesoption = <a href="#/" onClick={this.toggle} className={classesshared.show_link}>Show Files</a>
        let inputElement = <Filestack buttontype={FilestackType.moderatordoc} 
                            //option={options}
                            onSuccessupload={this.props.onSuccessImageupload} buttontext={this.props.buttontext} onErrorupload={this.props.onErrorImageupload}></Filestack>;   
        // let lablefield=null;        
        // if(this.props.label !== undefined)
        // {
        //     lablefield =<div className={this.props.formlabel}>{this.props.label}</div>
        // }
        return (
            <React.Fragment>                
                    {/* {lablefield} */}
                    <div className={classesshared.upload_file}>
                        <div>
                            <img src={downloadimage} className={classesshared.image_21} alt="Upload Doc"/>
                            <a href="#/" className={classesshared.upload_link}>
                                    {inputElement}
                            </a>  
                        </div>
                        <div >
                            {shofilesoption}
                        </div>             
                    </div>                
                {modeldata}
                <div className={classesshared.font_1_regular_text_12_color_grey_dark_3.join(' ')}>{this.props.textlable}</div>
            </React.Fragment>        
        );
    }
};
export default uploaddocs;