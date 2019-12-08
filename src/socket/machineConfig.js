import { sendParent, assign, send } from 'xstate';

const machineConfig = {
    id: "socket",
    context: {
    },
    initial: "ready",
    states: {
      ready: {
        type: "parallel",
        on: {
          SOCKET_UPDATE: [
            {
              target: 'component1',
              cond: "isComponent1", 
            },
            {
              target: 'component2',
              cond: "isComponent2", 
            },
          ]
        },
        states: {
          idle: {
            on: {
              FETCH: 'success'
            }
          },
          success: {
            type: 'final'
          },
        }
      },
      component1: {
        actions: send('SOCKET_COMPONENT1')
      },
      component2: {
        actions: send('SOCKET_COMPONENT2')
      },
    }
  };
  
  export default machineConfig