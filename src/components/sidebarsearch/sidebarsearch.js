import React from 'react';
import * as classshared from '../UI/Backhistory/classconst';
import { ButtonType, ButtonText, commonplaceholder } from '../../shared/utility';
import NavButton from '../UI/Button/navlinkbutton';
import Button from '../UI/Button/Button';
//import Dropdown from 'react-dropdown'
import {get_country_by_table, get_state_by_country} from '../../actions/userprofile/dataactions';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';


class sidebarsearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            countrydata:null,
            statedata:null,            
            country: '', 
            region: ''
        }
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    selectCountry (val) {
        this.setState({ country: val });
      }
    
      selectRegion (val) {
        this.setState({ region: val });
      }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    closeMenu(event) {
        event.preventDefault();
        //if (!this.dropdownMenu.contains(event.target)) {          
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
        //}
    }
    componentDidMount()
    {      
          var data= get_country_by_table(this.props.table_name)        
          data.then(res=>
          {              
              if(res !== undefined)
              {                  
                  if(res.data["error"] === undefined)
                  {                              
                      this.setState( { countrydata:res.data});                       
                  }                
              }                                       
          }); 

          var statedata= get_state_by_country(this.props.table_name)        
          statedata.then(res=>
          {              
              if(res !== undefined)
              {                  
                  if(res.data["error"] === undefined)
                  {                              
                      this.setState( { statedata:res.data});                       
                  }                
              }                                       
          }); 
    } 
    render() {
       const exploretext = this.props.exploretext === null || this.props.exploretext === undefined ? ButtonText.select : this.props.exploretext
        const { country, region } = this.state;
        let countrydiv=null;
        let statediv=null;
        if(this.state.countrydata !== null)
        {
            // countrydiv=<Dropdown options={this.state.countrydata} placeholder={commonplaceholder.select} />
            countrydiv= <CountryDropdown
            classes={classshared.dropdown_content_black.join(' ')}
            defaultOptionLabel={commonplaceholder.country}
            value={country}
            onChange={(val) => this.selectCountry(val)} />
        }
        if(this.state.statedata !== null)
        {
           // statediv=<Dropdown placeholderClassName={classshared.sidebardropdownplaceholder} options={this.state.statedata} placeholder={commonplaceholder.allregion} />
           statediv= <RegionDropdown
           classes={classshared.dropdown_content.join(' ')}
           country={country}
           blankOptionLabel={commonplaceholder.allregion}
           value={region}
           onChange={(val) => this.selectRegion(val)} />
        }

        return (
            <div className={classshared.explore}>
                <div className={classshared.explore__items_withoutwidth}>
                    <div className={classshared.side_nav__item}>Explore</div>
                    <div className={classshared.list_dropdown}><Button islisting={true} btntype={ButtonType.btn_red_italic} clicked={this.showMenu}>{exploretext}</Button>
                        {
                            this.state.showMenu
                                ? (
                                    <div
                                        className={classshared.list_dropdown_content}
                                    >
                                        <NavButton btntype={ButtonType.dropdownnavlink} link={`/explorepeople`}>{ButtonText.people}</NavButton>
                                        <NavButton btntype={ButtonType.dropdownnavlink} link={`/exploreexpo`}>{ButtonText.expo}</NavButton>
                                        <NavButton btntype={ButtonType.dropdownnavlink} link={`/explorewings`}>{ButtonText.wings}</NavButton>
                                    </div>
                                )
                                :
                                (
                                    null
                                )
                        }
                    </div>
                </div>
                <div className={classshared.explore__items_withoutwidth}>
                <div className={classshared.side_nav__item}>from</div>
                <div className={classshared.list_dropdown}>
                    {countrydiv}
                </div>
                </div>
                <div className={classshared.margin_t_m}></div>
                <div className={classshared.explore__items_withoutwidth}>
                <div className={classshared.side_nav__item}>in</div>
                <div className={classshared.list_dropdown}>
                    {statediv}
                </div>
                </div>
            </div>
        )
    }

};
export default sidebarsearch;