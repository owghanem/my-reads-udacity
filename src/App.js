import React from 'react'
import Home from './Pages/Home';
import { Switch, Route } from 'react-router-dom';
import Search from './Pages/Search';
import './App.css'

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={Search} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
