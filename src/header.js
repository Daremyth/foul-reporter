import React from 'react';
import logo from './orgsmall.png'; // Tell Webpack this JS file uses this image

const divStyle = {
  marginLeft: '50px',
  display: 'flex',
  'alignItems': 'center'
};



function Header() {
  // Import result is the URL of your image
  return (
  	<div style={divStyle}>
  		<img src={logo} alt="Logo" />Online Foul Report
  	</div>	
  	);
}

export default Header;