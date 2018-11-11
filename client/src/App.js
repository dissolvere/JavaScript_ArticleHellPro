import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="ID"></meta>
      
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
      </div>
    );
  }
}

export default App; 
