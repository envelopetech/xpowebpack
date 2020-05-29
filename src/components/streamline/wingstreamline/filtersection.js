import React, { Component } from 'react';
import * as classshared from '../classconst';
import { Userwingstabindex } from '../../../shared/utility';
import { Form, Checkbox } from 'semantic-ui-react';
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import {get_wings_users} from '../../../actions/wings/dataactions'

const bigList = [];
for (var i = 1; i <= 1000; i++) {
    bigList.push({ id: i, name: `Item ${i}` });
}

class filtersection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayValue: [],
            wings_users: props.wings_users
        };
        this.selectMultipleOption = this.selectMultipleOption.bind(this);
    }
    selectMultipleOption(value) {
        // console.count('onChange')
        // console.log("Val", value);
        this.setState({ arrayValue: value });
    }
    componentDidMount(){      
        this.filldata();    
    }
    filldata()
    {          
        var data= get_wings_users(this.props.wing_id)        
        data.then(res=>
        {              
            if(res !== undefined)
            {                  
                if(res.data["error"] === undefined)
                {                     
                    this.setState( { wings_users:res.data});                
                }                
            }                                       
        });          
    }

    render() {
        let divusers = null;
        if (this.state.wings_users !== null) {
            if (this.state.wings_users.length > 0) {
                divusers = <div className={classshared.margin_b_l}>
                    <div className={classshared.title}>
                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Posted By:</div>
                    </div>
                    <div id="wingfilters" className={classshared.line}></div>
                    <Form>
                        <Form.Field>
                            <Picky
                                value={this.state.arrayValue}
                                options={this.state.wings_users}
                                onChange={this.selectMultipleOption}
                                open={true}
                                valueKey="user_id"
                                labelKey="name"
                                multiple={true}
                                includeSelectAll={true}
                                includeFilter={true}
                                dropdownHeight={600}
                            />

                        </Form.Field>

                    </Form>
                </div>

            }

        }

        return (
            <React.Fragment>
                <div id="stickysize1of3" className={classshared.size1of3.join(' ')}>

                    {
                        this.props.tabitems.toString() === Userwingstabindex.conversion.toString() ?
                            (

                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.title}>
                                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Conversion Status:</div>
                                    </div>
                                    <div id="wingfilters" className={classshared.line}></div>
                                    <Form>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                className={classshared.margin_r_sm.join(' ')}
                                                label='Win'
                                                name='checkboxRadioGroupconversionstatus'
                                                value='win'
                                                checked={this.props.filterconversionstatusvalue === 'win'}
                                                onChange={this.props.FilterhandleConversionStatusChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='Lose'
                                                name='checkboxRadioGroupconversionstatus'
                                                value='lose'
                                                className={classshared.margin_r_sm.join(' ')}
                                                checked={this.props.filterconversionstatusvalue === 'lose'}
                                                onChange={this.props.FilterhandleConversionStatusChange}
                                            />
                                        </Form.Field>
                                    </Form>

                                </div>
                            )
                            : null
                    }
                    <div className={classshared.margin_b_m}>
                        <div className={classshared.title}>
                            <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Posted:</div>
                        </div>
                        <div id="wingfilters" className={classshared.line}></div>
                        <Form>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    className={classshared.margin_r_sm.join(' ')}
                                    label='By Me'
                                    name='checkboxRadioGroupposted'
                                    value='byme'
                                    checked={this.props.filterpostvalue === 'byme'}
                                    onChange={this.props.FilterhandlePostChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='To Me'
                                    name='checkboxRadioGroupposted'
                                    value='tome'
                                    className={classshared.margin_r_sm.join(' ')}
                                    checked={this.props.filterpostvalue === 'tome'}
                                    onChange={this.props.FilterhandlePostChange}
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    {
                        this.props.tabitems.toString() !== Userwingstabindex.recommend.toString() ?
                            (
                                <div className={classshared.margin_b_m}>
                                    <div className={classshared.title}>
                                        <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Type:</div>
                                    </div>
                                    <div id="wingfilters" className={classshared.line}></div>
                                    <Form>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                className={classshared.margin_r_sm.join(' ')}
                                                label='Internal'
                                                name='checkboxRadioGrouptype'
                                                value='internal'
                                                checked={this.props.filtertypevalue === 'internal'}
                                                onChange={this.props.FilterhandleTypeChange}
                                            />
                                        </Form.Field>
                                        <Form.Field>
                                            <Checkbox
                                                radio
                                                label='External'
                                                name='checkboxRadioGrouptype'
                                                value='external'
                                                className={classshared.margin_r_sm.join(' ')}
                                                checked={this.props.filtertypevalue === 'external'}
                                                onChange={this.props.FilterhandleTypeChange}
                                            />
                                        </Form.Field>
                                    </Form>

                                </div>
                            ) : null
                    }
                    <div className={classshared.margin_b_m}>
                        <div className={classshared.title}>
                            <div className={classshared.font_1_medium_text_14_text_dark.join(' ')}>Posted On:</div>
                        </div>
                        <div id="wingfilters" className={classshared.line}></div>
                        <Form>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    className={classshared.margin_r_sm.join(' ')}
                                    label='Today'
                                    name='checkboxRadioGrouppostedon'
                                    value='today'
                                    checked={this.props.filterpostedonvalue === 'today'}
                                    onChange={this.props.FilterhandlePostedonChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='This Week'
                                    name='checkboxRadioGrouppostedon'
                                    value='thisweek'
                                    className={classshared.margin_r_sm.join(' ')}
                                    checked={this.props.filterpostedonvalue === 'thisweek'}
                                    onChange={this.props.FilterhandlePostedonChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    className={classshared.margin_r_sm.join(' ')}
                                    label='This Month'
                                    name='checkboxRadioGrouppostedon'
                                    value='thismonth'
                                    checked={this.props.filterpostedonvalue === 'thismonth'}
                                    onChange={this.props.FilterhandlePostedonChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    radio
                                    label='This Year'
                                    name='checkboxRadioGrouppostedon'
                                    value='thisyear'
                                    className={classshared.margin_r_sm.join(' ')}
                                    checked={this.props.filterpostedonvalue === 'thisyear'}
                                    onChange={this.props.FilterhandlePostedonChange}
                                />
                            </Form.Field>
                        </Form>
                    </div>
                    <div className={classshared.margin_b_m}>
                        {divusers}
                    </div>

                </div>
            </React.Fragment>
        )
    }
}

export default filtersection;