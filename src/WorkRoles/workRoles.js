import React, { useState, useEffect } from 'react';
import {get} from '../shared-functions';
import './role-styles';

function WorkRoles() {
  const [workRoles, getWorkRoles] = useState([]);

  useEffect(() => {
    get('/api/workroles', getWorkRoles)
  })

  return (
    <div className="App">
      <header className="App-header">
      {workRoles? 
      <div>
      {workRoles.map(role => {
        return(<div>
<h2>{role.title}</h2>
<h4>{role.id}</h4>
<p>{role.description}</p>

        </div>)
      })}
      </div>
    : null}
        
      </header>
    </div>
  );
}

export default WorkRoles;