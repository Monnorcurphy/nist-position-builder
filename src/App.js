import React from 'react';
import './App.css';
import WorkRoles from './WorkRoles/workRoles'
import {BrowserRouter as Router, Switch,Route,Link} from "react-router-dom";
import {WorkRoleBuilder} from './RoleBuilder/workRoleBuilder'
import RoleComparison from './RoleComparison/roleComparison'
// import Home from './Home/home'

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/workroles">Work Roles</Link>
            </li>
            <li>
              <Link to="/rolecomparison">Role Comparison</Link>
            </li>
            <li>
              <Link to="/workrolebuilder">Work Role Builder</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/workroles">
            <WorkRoles />
          </Route>
          <Route path="/rolecomparison">
            <RoleComparison />
          </Route>
          <Route path="/workrolebuilder">
            <WorkRoleBuilder />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

const Home = () => (<div>Welcome to Seemless Transition</div>)

export default App;