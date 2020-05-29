import React from "react";
import { components } from 'react-select';

import * as classshared from '../../commoncss/classconst';



const Option = props => {
  const {data} = props;

  

  return (
    <components.Option {...props}>
      <div className={classshared.sidebar__user_stats.join(' ')}>                       
          <div className={classshared.sidebar__user_details_left.join(' ')}>         
              <div className={classshared.sidebar__user_stats_company_college.join(' ')}>{data.label}</div> 
          </div>                                       
      </div>
    </components.Option>
  );
};

export default Option;