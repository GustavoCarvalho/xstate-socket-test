import { assign } from "xstate";

const initMachineOptions = (
) => ({
  guards: {
    isComponent1: (context, event) => event.path === "component1",
    isComponent2: (context, event) => event.path === "component2",
  },
  services: {
    // requestSocket: (context, event) => getSocket(),
  },
  actions: {
    
  }
});

export default initMachineOptions;
