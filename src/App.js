import React, {useState} from 'react';
import { 
  Route, 
  useRouteMatch,
  useLocation
} from "react-router-dom";
import {Switch, HashRouter as Router } from "react-router-dom"
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import machineConfig from './socket/machineConfig'
import machineOptions from './socket/machineOptions'
import './App.css';
import Component1 from './components/Component1/Component1'

export const App = (props) => {

  const machineOptionsHandle = machineOptions();
  const SocketMachine = Machine(machineConfig, machineOptionsHandle)
  const [current, send] = useMachine(SocketMachine)


  let address = "ws://localhost:3001"
  let ws = new WebSocket(address)
  
  ws.onopen = function() {
      console.log('WS opened')
  };

  ws.onmessage = function (event) {
      let msg = JSON.parse(event.data)
      if (msg.action === 'refresh') {
          console.log('last update', msg.calc_time)
          send({
              type: "SOCKET_UPDATE",
              path: "current_page_url" // component1 || compoenente 2 > url page: http://localhost:3001/componente1#/" or http://localhost:3001/componente2#/"
          })
      }
  };

  ws.onclose = function (event) {
      console.log('Socket is closed. Reconnect will be attempted in 1 second.', event.reason);
  };

  ws.onerror = function (err) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
      ws.close();
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Index
        </p>
        <a
          className="App-link"
          href="/component1"
          rel="noopener noreferrer"
        >
          Component 1
        </a>
        <a
          className="App-link"
          href="/component2"
          rel="noopener noreferrer"
        >
          Component 2
        </a>
        
      </header>
      <body>
        <Router>
          <Switch>
            <Route exact path='/component1' component={Component1}  />
            <Route exact path='/component2' component={Component1}  />
          </Switch>
        </Router>
      </body>
    </div>
  );
}

export default App;
