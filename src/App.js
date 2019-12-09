import React from 'react';
import './App.css';
import Particles from 'react-particles-js';

import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


// Clarifai API


// Particle effect configuration
const particleEffect = {
  "particles": {
      "number": {
          "value": 50,
      },
      "size": {
          "value": 3
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: [],
      route: 'signin',
      userProfile: {
        id: '',
        username: '',
        email: '',
        joined: '',
        entries: 0,
      }
    }
  }


  displayFaceBox = (box) => {
    this.setState({
      box: [...box]
    })

  }
  // Calculate top, left, bottom, right of 1 face location
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width); // Or clientwidth
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  // Calculate top, left, bottom, right position of multiple faces
  calculateMultiFaceLocation = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('input-image');
    const width = Number(image.width)
    const height = Number(image.height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }
  // Combine calculate and drawing
  calculateLocationAndDraw = (data) => {
    let boxArray = data.outputs[0].data.regions.map((region) => {
      return this.calculateMultiFaceLocation(region)
    })
    this.displayFaceBox(boxArray);
  } 

  onInputChange = (event) => {
    this.setState({
      input: event.target.value,
    })
  }

  onButtonSubmit = (event) => {
    this.setState({
      imageUrl: this.state.input,
    })
    fetch('https://secure-plains-33429.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        imageUrl: this.state.input,
      })
    }).then(response => response.json())
    .then((response) => {
      fetch('https://secure-plains-33429.herokuapp.com/image', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.userProfile.id,
        })
      }).then(response => response.json())
      .then(entries => {
        this.setState(Object.assign(this.state.userProfile, {entries,}));
      }).catch(err => console.log(err));

      this.calculateLocationAndDraw(response);
    }).catch(err => console.log(err))
  }
  // Change route state 
  onRouteChange = (route) => {
    if ( route === 'signin') {
      this.setState({
        imageUrl: '',
      })
    }
    this.setState({
      route,
    });
  }

  // Change user state 
  loadUserProfile = (data) => {
    this.setState({
      userProfile: {
        id: data.id,
        username: data.username,
        email: data.email,
        joined: data.joined,
        entries: data.entries,
      }
    })
  }

  // Unload user profile
  unloadUserProfile = () => {
    this.setState({
      userProfile: {
        id: '',
        username: '',
        email: '',
        joined: '',
        entries: 0,
      }
    })
  }
  render() {
    return (
      <div className='App'>
        <Particles params={particleEffect} className="particle-effect" />
        {
          (this.state.route === 'signin')
          ? <Signin onRouteChange={this.onRouteChange} loadUserProfile={this.loadUserProfile} />
          : ( (this.state.route === 'home') 
            ? (<React.Fragment>
                <Navigation onRouteChange={this.onRouteChange} unloadUserProfile={this.unloadUserProfile} />
                <Logo />
                <Rank entries={this.state.userProfile.entries} username={this.state.userProfile.username}/>
                <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
                <FaceRecognition imageSrc={this.state.imageUrl} boxArray={this.state.box}/>
              </React.Fragment>) 
            : <Register onRouteChange={this.onRouteChange}  />
          )
        }
      </div>
    );
  }
}

export default App;
