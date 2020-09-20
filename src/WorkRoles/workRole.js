import React, { useState, useEffect } from 'react';
import {get} from '../shared-functions';
import './role-styles';

const WorkRole = ({id})=>{
  const [workRole, getWorkRole] = useState([]);

  useEffect(() => {
    get(`/api/workrole/${id}`, getWorkRole)
  })

  debugger;
  return (
    <div className="App">
      <header className="App-header">
      {workRole? 
      <div>
      {workRole.map(role => {
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

export default workRole;