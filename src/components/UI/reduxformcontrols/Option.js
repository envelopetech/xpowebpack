import React from "react";
import { components } from 'react-select';
import Avatar from 'react-avatar';
import * as classshared from '../search/classconst';

const GRAVATAR_SIZE = 30;
const Option = props => {
  const {data} = props;  

  return (
    <components.Option {...props}>
      <div className={classshared.sidebar__user_stats.join(' ')}>                       
          <div className={classshared.sidebar__user_details_left.join(' ')}>
          <Avatar round size={GRAVATAR_SIZE} className="avatar" color="#0366d6" name={data.label} src={data.avatar} />
              <div className={classshared.sidebar__user_stats_company_college.join(' ')}>{data.label}</div> 
          </div>                                       
      </div>
    </components.Option>
  );
};
export default Option;