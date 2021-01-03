import React from "react";
import "./App.css";
import WorkRoles from "./WorkRoles/workRoles";
import WorkRole from "./WorkRoles/workRole";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { WorkRoleBuilder } from "./WorkRoles/workRoleBuilder";
import RoleComparison from "./RoleComparison/roleComparison";
import Statements from "./KSAT/statements";
import Statement from "./KSAT/statement";
import WorkRoleEditor from "./WorkRoles/workRoleEditor";
import EditRole from "./WorkRoles/editRole";
import Home from "./Home/home";

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
            <li>
              <Link to="/workroleeditor">Work Role Editor</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route
            component={({ match }) => (
              <div>
                <Route path="/workroles" component={WorkRoles} />
                <Route path="/workrole" render={() => <WorkRole />} />
                <Route
                  path="/workroleeditor"
                  render={() => <WorkRoleEditor />}
                />
                <Route path="/editrole" render={() => <EditRole />} />; ;
              </div>
            )}
          />

          <Route
            component={({ match }) => (
              <div>
                <Route path="/statements" component={Statements} />
                <Route
                  path="/statements/knowledge"
                  render={() => <Statements type="Knowledge" />}
                />
                <Route
                  path="/statements/skill"
                  render={() => <Statements type="Skill" />}
                />
                <Route
                  path="/statements/ability"
                  render={() => <Statements type="Ability" />}
                />
                <Route
                  path="/statements/task"
                  render={() => <Statements type="Task" />}
                />
                <Route path="/statement" render={() => <Statement />} />;
              </div>
            )}
          />
          <Route path="/workrole" component={WorkRoles} />
          {/* <Route path="/rolecomparison" component={RoleComparison} />
          <Route path="/workrolebuilder" component={WorkRoleBuilder} /> */}

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// const Home = () => <div>Welcome to Seemless Transition</div>;

export default App;
