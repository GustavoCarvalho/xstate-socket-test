import React from 'react'
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import machineConfig from './machine_states/machineConfig'
import machineOptions from './machine_states/machineOptions'

const Component1 = (props) => {

    const machineOptionsHandle = machineOptions();

    const Component1Machine = Machine(machineConfig, machineOptionsHandle);
    const [current, send] = useMachine(Component1Machine);

    const handleComponent1Change = e => {
        send({
            type: "SUBMIT",
            Component1_selected: e
        });
    };

    return (
        <div>
            <p>Component1</p>
            <button onClick={handleComponent1Change()}></button>
        </div>
    );
}

export default (Component1)
