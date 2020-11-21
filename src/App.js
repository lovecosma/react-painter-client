import Painter from  './containers/Painter'
import SampleForm from './containers/SampleForm'
import Nav from './containers/Nav'
import { BrowserRouter as Router, Switch, Route,  } from 'react-router-dom';



function App() {
  return (
   <div>
     <Router>
      <Switch>
        <div>
          <Nav/>
          <Route exact path='/addSample' render={routerProps => <SampleForm/>}/>
          <Route exact path='/painter' render={routerProps => <Painter/>}/>
        </div>
      </Switch>
    </Router>
   </div>
  );
}

export default App;
