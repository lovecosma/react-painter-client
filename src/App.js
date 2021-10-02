import Painter from  './containers/Painter'
import Nav from './containers/Nav'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from "react-redux"
import fetchSamples  from "./actions/fetchSamples"
import React, { Component } from "react"


class App extends Component {

  componentDidMount(){
    this.props.fetchSamples()
  }

  render(){

    return (
        <div>

          {this.props.samples[0] ? 
          <div>
          <Router>
          <Switch>
            <div>
              <Nav/>
              <Route exact path='/' render={routerProps => <Painter samples={this.props.samples}/>}/>
            </div>
          </Switch>
        </Router>
        </div> 
        :
        <div><h3>Loading</h3></div>}


        </div>
      );

  }
  
}

const mapStateToProps = ({samplesReducer}) => {
  return ({
      samples: samplesReducer.samples
    }
  )
}

export default connect(mapStateToProps, { fetchSamples })(App);
