import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capitalize, get } from "../shared-functions";
import "./role-styles";
import { CSVLink, CSVDownload } from "react-csv";

const WorkRole = ({ id }) => {
  const [workRole, getWorkRole] = useState({});
  const [location, updateParams] = useState(useLocation());

  useEffect(() => {
    if (id) {
      get(`/api/workrole/${id}`, getWorkRole);
    }
    let identity = location.pathname.split("/workrole/")[1];

    get(`/api/workrole/${identity}`, getWorkRole);
  }, [id, location.pathname]);

  let headers = [
    { label: "Work Role Id", key: "roleId" },
    { label: "Work Role Title", key: "roleTitle" },
    { label: "Work Role Description", key: "roleDescription" },
    { label: "Statement Id", key: "statementId" },
    { label: "Statement", key: "statementText" },
    { label: "Statement Type", key: "statementType" },
  ];

  let data = [
    { roleId: `${workRole.id}`, roleTitle: `${workRole.title}` },
    { roleDescription: `${workRole.description}` },
  ];
  if (workRole.statements && workRole.statements.length) {
    data = data.concat(
      workRole.statements.map((statement) => {
        let keys = Object.keys(statement);

        let obj = {};
        keys.forEach((key) => {
          obj[`statement${capitalize(key)}`] = statement[`${key}`];
        });
        return obj;
      })
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <CSVLink headers={headers} data={data}>
          Download this workrole
        </CSVLink>
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
