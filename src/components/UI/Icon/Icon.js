import React from 'react';
import PropTypes from 'prop-types';

const Icon = props => (
  
  <svg className={props.svgclass} viewBox="0 0 20 20">
    <path d={props.icon}></path>
    {
      props.isanimate 
      ?
      (
        <animate attributeType="XML" attributeName="fill" values={props.values} dur="2.5s" repeatCount="indefinite"></animate>
      )
      : null
      
    }
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};
export default Icon;
// import React from 'react';
// import PropTypes from 'prop-types';

// const Icon = props => {
//   const styles = {
//     svg: {
//       display: 'inline-block',
//       verticalAlign: 'middle',
//     },
//     path: {
//       fill: props.color,
//     },
//   };

//   return (
//     <svg
//       style={styles.svg}
//       width={`${props.size}px`}
//       height={`${props.size}px`}
//       viewBox="0 0 1024 1024"
//     >
//       <path
//         style={styles.path}
//         d={props.icon}
//       ></path>
//     </svg>
//   );
// };

// Icon.propTypes = {
//   icon: PropTypes.string.isRequired,
//   size: PropTypes.number,
//   color: PropTypes.string,
// };

// Icon.defaultProps = {
//   size: 16,
// };

// export default Icon;