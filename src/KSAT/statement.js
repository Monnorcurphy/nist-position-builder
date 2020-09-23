import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get, urlParams, capitalize } from "../shared-functions";

const Statement = ({ id }) => {
  const [statement, getStatement] = useState({});
  const [location, updateParams] = useState(useLocation());

  /* TODO
    Discuss statements/:type/:id route, and a statement/:id route?
    Find a less hacky way to handle the ID being in route (forgetting solution at the moment)
  */

  useEffect(() => {
    if (id) {
      get(`/api/statement/${id}`, getStatement);
    }
    let identity = location.pathname.split("/statement/")[1];
    get(`/api/statement/${identity}`, getStatement);
  }, [id, location]);

  debugger;
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h2>{statement.id}</h2>
          <h4>{statement.type}</h4>
          <p>{statement.text}</p>
        </div>
      </header>
    </div>
  );
};

export default Statement;
