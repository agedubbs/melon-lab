import React from "react";
import { Menu } from "semantic-ui-react";
import ManagerView from "../managerView/managerView";
import SetupContainer from "../setup/container";
import InvestContainer from "../invest/container";
import ExecuteRequestContainer from "../executeRequest/container";

import "../../App.css";

const App = props => (
  <div className="App">
    <div className="App-header">
      <h1>MELON</h1>
      <Menu secondary>
        <Menu.Menu position="right">
          <Menu.Item name="My fund" href="#factsheet" />
          <Menu.Item name="Trade" href="#trade" />
          <Menu.Item name="Settings" href="#settings" />
        </Menu.Menu>
      </Menu>
    </div>
    <hr />
    {/* {props.general.mode === "Manage" ? (
      <ManagerView />
    ) : props.general.mode === "Setup" ? (
      <SetupContainer />
    ) : props.general.mode === "Invest" ? (
      <InvestContainer />
    ) : (
      <ExecuteRequestContainer />
    )} */}

    {props.general.mode === "Setup" ? (
      <SetupContainer />
    ) : props.general.mode === "Invest" ? (
      <InvestContainer />
    ) : props.general.mode === "Execute" ? (
      <ExecuteRequestContainer />
    ) : props.general.mode === "Manage" ? (
      <ManagerView />
    ) : (
      <div />
    )}
  </div>
);

export default App;
