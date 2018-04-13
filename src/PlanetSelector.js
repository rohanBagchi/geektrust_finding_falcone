import React from 'react';
import PropTypes from 'prop-types';

export default function PlanetSelector({ planets }) {
    const renderPlanets = () => planets.map((planet, index) => {
        return (
            <option
                key={index}
                value={planet.name}>
                {planet.name}
            </option>
        )
    });

    return (
        <select className="custom-select">
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
}
