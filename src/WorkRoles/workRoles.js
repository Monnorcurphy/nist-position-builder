import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { get } from "../shared-functions";
import "./role-styles";

function WorkRoles() {
  const [workRoles, getWorkRoles] = useState([]);
  const [history, updateHistory] = useState(useHistory());

  const navigateToTask = (id) => {
    history.push(`workrole/${id}`);
  };

  useEffect(() => {
    get("/api/workroles", getWorkRoles);
  }, []);

  debugger;
  return (
    <div className="App">
      <header className="App-header">
        {workRoles ? (
          <div>
            {workRoles.map((role) => {
              return (
                <div onClick={() => navigateToTask(role.id)}>
                  <h2>{role.title}</h2>
                  <h4>{role.id}</h4>
                  <p>{role.description}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </header>
    </div>
  );
}

export default WorkRoles;
