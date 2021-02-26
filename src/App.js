import './App.css';
import React, {Component} from 'react';
import Particles from "react-tsparticles";
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const particlesOptions = {
          background: {
            color: {
              value: "linear-gradient(to right, #226ad8, #2667c1, #2e62a9, #385e92, #40587a)",
            },
          },
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40,
              },
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                value_area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }

const initialState = {
      input: '',
      imageUrl: '',
      boxes: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
  	super();
  	this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation =(data) => {

  	const clarifaiFaces = data.outputs[0].data.regions.map( (region) =>  region.region_info.bounding_box )
  	const image= document.getElementById('imageInput');
  	const width = Number(image.width);
  	const height = Number(image.height);

	const filteredBoxes = clarifaiFaces.map(face => {
		return {
	  		leftCol: face.left_col * width,
	  		topRow: face.top_row * height,
	  		rightCol: width - (face.right_col * width),
	  		bottomRow: height - (height * face.bottom_row)
	  	}
	})  	
  	return filteredBoxes
  }

  displayFaceBox = (boxes) => {
  	this.setState({boxes: boxes})
  }

  onInputChange =(event) => {
  	this.setState({input: event.target.value});
  }
 
  onButtonSubmit = () => {
	 this.setState({ imageUrl : this.state.input})
   fetch('https://sheltered-cove-99864.herokuapp.com/imageUrl', {
    method: 'post',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify({
      input: this.state.input
    })
   })
   .then (response => response.json())
	.then(response => {
    if (response) {
      fetch('https://sheltered-cove-99864.herokuapp.com/image', {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          id: this.state.user.id
        })
      })

      .then( response => response.json())
      .then( count => {
        this.setState(Object.assign(this.state.user, {entries: count}))
      })
      .catch(console.log);
    }
    this.displayFaceBox(this.calculateFaceLocation(response))
  })
	.catch(console.log);
  };    


  onRouteChange = (route) => {
  	if (route === 'signin' || route === 'register' ) {
  		this.setState(initialState);
  	} else if (route === 'home') {
  		this.setState({isSignedIn: true});
  	}
  	this.setState({ route: route})
  }


  render() {
  	const {imageUrl, boxes, route, isSignedIn, user} = this.state;
	  return (
	    <div className="App">
	      <Particles id='tsparticles' options={particlesOptions}/>
	      { route === 'home' ?
	      	<div>
		      <Navigation isSignedIn= {isSignedIn} onRouteChange= {this.onRouteChange} />
		      <Logo/>
		      <Rank name = {user.name} entries = {user.entries}/>
		      <ImageLinkForm onButtonSubmit= {this.onButtonSubmit} onInputChange= {this.onInputChange}/>
		      <FaceRecognition imageUrl= {imageUrl} boxes= {boxes}/>
		      </div>
		      :(
		       route ==='signin' ?
	      	  	<SignIn  onRouteChange= {this.onRouteChange} loadUser = {this.loadUser} /> 
	      		: <Register  onRouteChange= {this.onRouteChange} loadUser = {this.loadUser}/>
	      	   )
	      }
	    </div>
	  );
  }
}

export default App;
