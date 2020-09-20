import React, { useState, useEffect } from 'react';
import {get} from '../shared-functions';

function Statements(){
    const [statements, getStatements] = useState([]);
  
    useEffect(() => {
      get('/api/statements/', getStatements)
    })
  
    return (
      <div className="App">
        <header className="App-header">
        {statements? 
        <div>
        {statements.map(statement => {
          
          return(<div>
  <h2>{statement.id}</h2>
  <h4>{statement.type}</h4>
  <p>{statement.text}</p>
  
          </div>)
        })}
        </div>
      : null}
          
        </header>
      </div>
    );
  }
  
  export default Statements;