import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { get, urlParams, capitalize } from "../shared-functions";

const Statements = ({ type = null }) => {
  const [statements, getStatements] = useState([]);
  const [history, updateHistory] = useState(useHistory());
  useEffect(() => {
    if (type) {
      get(`/api/statements/${type}`, getStatements);
    } else if (
      window.location.href.indexOf("statements/") !== -1 &&
      window.location.href.length >
        window.location.href.indexOf("statements/") + "statements/".length
    ) {
      let type = capitalize(
        window.location.href.slice(
          urlParams(window.location.href, "statements/")
        )
      );

      get(`/api/statements/${type}`, getStatements);
    } else {
      get("/api/statements/", getStatements);
    }
  }, [type]);

  const navigateToTask = (id) => {
    history.push(`statement/${id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        {statements ? (
          <div>
            {statements.map((statement) => {
              return (
                <div onClick={() => navigateToTask(statement.id)}>
                  <h2>{statement.id}</h2>
                  <h4>{statement.type}</h4>
                  <p>{statement.text}</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </header>
    </div>
  );
};

export default Statements;
