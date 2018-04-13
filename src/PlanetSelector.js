import React from 'react';
import PropTypes from 'prop-types';
import { FormNames } from './redux/PlanetDucks';

export default function PlanetSelector({ planets, selector, selected_planet, selectPlanet }) {
    const renderPlanets = () => {
        const planetOptions = planets.map((planet, index) => {
            return (
                <option
                    key={index}
                    value={planet.name}>
                    {planet.name}
                </option>
            );
        });

        const defaultOption = (
            <option
                key={'default'}
                value={''}>
                Select
            </option>
        );

        return [
            defaultOption,
            ...planetOptions
        ];
    };

    const handleSelect = e => {
        const planet = e.target.value;
        console.log('selected planet', planet);
        selectPlanet(planet, selector);
    };

    return (
        <select
            value={selected_planet}
            className="custom-select"
            onChange={handleSelect}>
            {renderPlanets()}
        </select>
    )
}

PlanetSelector.propTypes = {
    planets: PropTypes.arrayOf(
        PropTypes.shape({
            distance: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }).isRequired,
    ).isRequired,
    selector: PropTypes.oneOf(
        Object.keys(FormNames)
    ).isRequired,
    selected_planet: PropTypes.string,
    selectPlanet: PropTypes.func.isRequired,
}
