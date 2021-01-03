import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get, capitalize } from "../shared-functions";
import { CSVLink, CSVDownload } from "react-csv";
import "./role-styles";

const WorkRole = ({ id }) => {
  const [workRole, getWorkRole] = useState({});
  const [location, updateParams] = useState(useLocation());
  const [workRoleId, setWorkRoleId] = useState("");
  const [workRoleTitle, setWorkRoleTitle] = useState({});
  const [workRoleDescription, setWorkRoleDescription] = useState({});
  const [edited, setEdited] = useState({
    workRoleId: false,
    workRoleTitle: false,
    workRoleDescription: false,
    statements: [],
  });
  let [statementArray, setStatementInformation] = useState([]);

  useEffect(() => {
    if (id) {
      get(`/api/workrole/${id}`, getWorkRole);
    }
    let identity = location.pathname.split("/editRole/")[1];

    get(`/api/workrole/${identity}`, getWorkRole);
  }, [id, location.pathname]);

  useEffect(() => {
    if (workRole.statements) {
      setStatementInformation(workRole.statements);
    }
  }, [workRole.statements]);

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
  if (statementArray && statementArray.length) {
    data = data.concat(
      workRole.statements.map((statement, idx) => {
        let keys = Object.keys(statement);
        let obj = {};
        keys.forEach((key) => {
          debugger;
          if (key === "id" && edited.statements.includes(idx)) {
            obj[`statement${capitalize(key)}`] = `${
              statement[`${key}`]
            }_${new Date().toGMTString()}`;
          } else {
            obj[`statement${capitalize(key)}`] = statement[`${key}`];
          }
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

        <input
          id="workRoleID"
          value={edited.workRoleId ? workRoleId : workRole.id}
          onChange={(e) => {
            setEdited({ ...edited, workRoleId: true });
            setWorkRoleId(e.target.value);
          }}
        />
        <input
          id="workRoleTitle"
          value={edited.workRoleTitle ? workRoleTitle : workRole.title}
          onChange={(e) => {
            setEdited({ ...edited, workRoleTitle: true });
            setWorkRoleTitle(e.target.value);
          }}
        />
        <textarea
          id="workRoleDescription"
          value={
            edited.workRoleDescription
              ? workRoleDescription
              : workRole.description
          }
          onChange={(e) => {
            setEdited({ ...edited, workRoleDescription: true });
            setWorkRoleDescription(e.target.value);
          }}
        />
        <div>
          {workRole.statements
            ? workRole.statements.map((statement, idx) => (
                <div>
                  <input
                    id={`statementID-${statement.id}`}
                    value={statement.id}
                    onChange={(e) => {
                      let newStatementArray = [...statementArray];
                      newStatementArray[idx].id = e.target.value;
                      if (!edited.statements.includes(idx)) {
                        edited.statements.push(idx);
                      }
                      setEdited(edited);
                      setStatementInformation(newStatementArray);
                    }}
                  />
                  <input
                    id={`statementType-${statement.type}-${statement.id}`}
                    value={statement.type}
                    onChange={(e) => {
                      let newStatementArray = [...statementArray];
                      newStatementArray[idx].type = e.target.value;
                      if (!edited.statements.includes(idx)) {
                        edited.statements.push(idx);
                      }
                      setEdited(edited);
                      setStatementInformation(newStatementArray);
                    }}
                  />
                  <textarea
                    id={`statementID-${statement.text}`}
                    value={statement.text}
                    onChange={(e) => {
                      let newStatementArray = [...statementArray];
                      newStatementArray[idx].text = e.target.value;
                      if (!edited.statements.includes(idx)) {
                        edited.statements.push(idx);
                      }
                      setEdited(edited);
                      setStatementInformation(newStatementArray);
                    }}
                  />
                </div>
              ))
            : null}
        </div>
      </header>
    </div>
  );
};

export default WorkRole;
