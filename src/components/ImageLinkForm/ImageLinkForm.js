import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div >
			<p className='f3'>
				{'This Magic Brain will detect faces in your images, give it a try!'}
			</p>
			<div className='center'>
				<div className=' form center pa4 br3 shadow-3'>	
					<input className='f4 pa2 w-70 ' type='text' 
					onChange= {onInputChange}/>
					<button className=' w-30 grow f4  ph3 pvlink2 dib white bg-light-blue'
					onClick= {onButtonSubmit}
					>
					Detect</button>			
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;
