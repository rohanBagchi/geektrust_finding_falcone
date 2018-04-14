import React from 'react';
import PropTypes from 'prop-types';
import { FormNames } from './redux/PlanetDucks';

export default function VehicleSelector({ vehicles, selector, selected_vehicle, selectVehicle, should_render }) {
    if (!should_render) return null;

    const renderVehicles = () => {
        return vehicles.map((vehicle, index) => {
            const id = `vehicle_selector-${selector}-${index}`;
            const is_disabled = isDisabled(vehicle, selected_vehicle);
            const label_classes = "form-check-label label" + (is_disabled ? " disabled" : "");
            return (
                <div key={index} className="form-check">
                    <label className={label_classes} htmlFor={id}>
                        <input
                            id={id}
                            className="form-check-input"
                            type="radio"
                            name={"vehicle_selector-" + selector}
                            value={vehicle.name}
                            onChange={handleSelect}
                            disabled={is_disabled} />
                        {vehicle.name} ({vehicle.count})
                    </label>
                </div>
            );
        });
    };

    const handleSelect = e => {
        const vehicle = e.target.value;
        selectVehicle(vehicle, selector);
    };

    return (
        <React.Fragment>
            {renderVehicles()}
        </React.Fragment>
    );
}

VehicleSelector.propTypes = {
    vehicles: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            count: PropTypes.number.isRequired,
        }).isRequired,
    ).isRequired,
    selector: PropTypes.oneOf(
        Object.keys(FormNames)
    ).isRequired,
    selected_vehicle: PropTypes.string,
    selectVehicle: PropTypes.func.isRequired,
}

function isDisabled(current_vehicle, selected_vehicle) {
    return current_vehicle.name !== selected_vehicle && current_vehicle.count === 0;
}
