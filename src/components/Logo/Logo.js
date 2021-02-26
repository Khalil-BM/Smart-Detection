import React from 'react';
import Tilt from 'react-tilt'
import './Logo.css'
import image from './default.png'

const Logo = () => {
	return (
		<div className= 'ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2"  options={{ max : 50, reset: false, axis : "x" }} style={{ height: 150, width: 150 }} >
				<div className="Tilt-inner p3"> 
					<img  src = {image}/>
				</div>
			</Tilt>
		</div>
	);
}

export default Logo;