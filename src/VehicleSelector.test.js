import React from 'react';
import ReactDOM from 'react-dom';
import VehicleSelector from './VehicleSelector';

it('renders <VehicleSelector/> without crashing', () => {
    const div = document.createElement('div');

    const vehicles = [
        {
            name: 'foo',
            count: 100
        },
        {
            name: 'bar',
            count: 200
        },
    ];
    const selector = "FORM_1";
    const selected_planet = "bar";
    const selectVehicle = () => { };

    ReactDOM.render(
        <VehicleSelector
            vehicles={vehicles}
            selector={selector}
            selected_planet={selected_planet}
            selectVehicle={selectVehicle}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
