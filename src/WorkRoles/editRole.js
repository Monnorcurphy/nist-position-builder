import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../shared-functions";
import "./role-styles";

const WorkRole = ({ id }) => {
  const [workRole, getWorkRole] = useState({});
  const [location, updateParams] = useState(useLocation());

  useEffect(() => {
    if (id) {
      get(`/api/workrole/${id}`, getWorkRole);
    }
    let identity = location.pathname.split("/editRole/")[1];

    get(`/api/workrole/${identity}`, getWorkRole);
  }, [id, location.pathname]);

  return (
    <div className="App">
      <header className="App-header">
        <div>{workRole.id}</div>
        <div>{workRole.title}</div>
        <div>{workRole.description}</div>
        <div>
          {workRole.statements
            ? workRole.statements.map((statement) => (
                <div>
                  <div>{statement.id}</div>
                  <div>{statement.type}</div>
                  <div>{statement.text}</div>
                </div>
              ))
            : null}
        </div>
      </header>
    </div>
  );
};

export default WorkRole;
