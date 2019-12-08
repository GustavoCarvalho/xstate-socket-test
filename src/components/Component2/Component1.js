import React from 'react'
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";
import machineConfig from './machine_states/machineConfig'
import machineOptions from './machine_states/machineOptions'

const Component2 = (props) => {

    const machineOptionsHandle = machineOptions();

    const Component1Machine = Machine(machineConfig, machineOptionsHandle);
    const [current, send] = useMachine(Component1Machine);

    const handleComponent2Change = e => {
        send({
            type: "SUBMIT",
            Component2_selected: e
        });
    };

    return (
        <div>
            <p>Component2</p>
            <button onClick={handleComponent2Change()}></button>
        </div>
    );
}

export default (Component2)
