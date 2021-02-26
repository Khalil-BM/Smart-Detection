import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, boxes}) => {
	return (
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='imageInput' src={imageUrl} width='500px' height='auto' /> 
				{
					Object.entries(boxes).map((box,i) => {
						return (
							<div 

								className='bounding-box' 
								style= {{ top: box[1].topRow, bottom: box[1].bottomRow, left: box[1].leftCol, right: box[1].rightCol}} 
								key= {i}>{console.log(box.topRow)}
							</div>
						);
				    })
			    }
			</div>
		</div>	
	)
}

export default FaceRecognition;