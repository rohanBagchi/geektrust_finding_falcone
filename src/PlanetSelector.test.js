import React from 'react';
import ReactDOM from 'react-dom';
import PlanetSelector from './PlanetSelector';

it('renders <PlanetSelector/> without crashing', () => {
    const div = document.createElement('div');

    const planets = [
        {
            name: 'foo',
            distance: 100
        },
        {
            name: 'bar',
            distance: 200
        },
    ];
    const selector = "FORM_1";
    const selected_planet = "bar";
    const selectPlanet = () => { };

    ReactDOM.render(
        <PlanetSelector
            planets={planets}
            selector={selector}
            selected_planet={selected_planet}
            selectPlanet={selectPlanet}
        />,
        div
    );
    ReactDOM.unmountComponentAtNode(div);
});
