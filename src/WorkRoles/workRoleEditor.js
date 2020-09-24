import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { get } from "../shared-functions";
import "./role-styles";

function WorkRoleEditor() {
  const [titleSearch, setTitleSearch] = useState("");
  const [descriptionSearch, setDescriptionSearch] = useState("");
  const [workRoles, getWorkRoles] = useState([]);
  const [searchedroles, updateSearchedRoles] = useState([]);
  const [history, updateHistory] = useState(useHistory());

  const setInitial = (roles) => {
    updateSearchedRoles(roles);
    getWorkRoles(roles);
  };

  useEffect(() => {
    get("/api/workroles", setInitial);
  }, []);

  const navigateToEdit = (id) => {
    history.push(`editRole/${id}`);
  };

  const updateSearch = (string, input) => {
    if (string.length === 0) {
      updateSearchedRoles(workRoles);
    }

    if (input === "title") {
      setTitleSearch(string);
    }

    if (input === "description") {
      setDescriptionSearch(string);
    }

    let titleFilter = input === "title" ? string : titleSearch;
    let descriptionFilter =
      input === "description" ? string : descriptionSearch;
    updateSearchedRoles(
      workRoles
        .filter((role) =>
          role.title.toUpperCase().includes(titleFilter.toUpperCase())
        )
        .filter((role) =>
          role.description
            .toUpperCase()
            .includes(descriptionFilter.toUpperCase())
        )
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <div>
            Title search:
            <input
              value={titleSearch}
              onChange={(event) => updateSearch(event.target.value, "title")}
            />
          </div>
          <div>
            Description search:
            <input
              value={descriptionSearch}
              onChange={(event) =>
                updateSearch(event.target.value, "description")
              }
            />
          </div>
        </div>

        {workRoles ? (
          <div>
            {searchedroles.map((role) => {
              return (
                <div>
                  <h2>{role.title}</h2>
                  <div onClick={() => navigateToEdit(role.id)}>Edit Button</div>
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

export default WorkRoleEditor;
