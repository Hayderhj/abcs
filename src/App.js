import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css'
import Notes from './components/Notes'
import NoteDetails from './components/NoteDetails'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          <Switch>
            <Route exact path='/' component={Notes} />
            <Route path='/details/:id' component={NoteDetails} />
            <Route render={() => (<p>Not Found</p>)} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
