import Painter from  './containers/Painter'
import Nav from './containers/Nav'
import About from './containers/About'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
   <div className="center">
     <Router>
      <Switch>
        <div>
          <Nav/>
          <Route exact path='/' render={routerProps => <About/>}/>
          <Route exact path='/painter' render={routerProps => <Painter/>}/>
        </div>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
