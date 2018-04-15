export function getSelectedPlanets(form) {
    const selected_planets = [];
    Object.keys(form).forEach(selector => {
        const { selected_planet } = form[selector];
        selected_planet && selected_planets.push(selected_planet);
    });
    return selected_planets;
}

export function getSelectedVehicles(form) {
    const selected_vehicles = [];
    Object.keys(form).forEach(selector => {
        const { selected_vehicle } = form[selector];
        selected_vehicle && selected_vehicles.push(selected_vehicle);
    });
    return selected_vehicles;
}

export function getTimeTaken({ selected_planet_names, selected_vehicle_names, planets, vehicles }) {
    const time_taken_list = [];
    const selector_length = selected_planet_names.length;

    for (let i = 0; i < selector_length; i++) {
        const selected_planet = selected_planet_names[i];
        const selected_vehicle = selected_vehicle_names[i];

        if (selected_planet && selected_vehicle) {
            const selected_planet_entity = planets.filter(p => p.name === selected_planet)[0];
            const selected_vehicle_entity = vehicles.filter(v => v.name === selected_vehicle)[0];
            const time_taken = Math.floor(selected_planet_entity.distance / selected_vehicle_entity.speed);
            time_taken_list.push(time_taken);
        }
    }

    return time_taken_list.reduce((x, y) => x + y, 0);
}

export function isSubmitButtonEnabled(planets_form, vehicles_form) {
    return isAllPlanetsSelected(planets_form) && isAllVehiclesSelected(vehicles_form);
}

export function isAllPlanetsSelected(planets_form) {
    const form_keys = Object.keys(planets_form);

    for (let i = 0; i < form_keys.length; i++) {
        const selector = form_keys[i];
        const { selected_planet } = planets_form[selector];
        if (!selected_planet) return false;
    }
    return true;
}

export function isAllVehiclesSelected(vehicles_form) {
    const form_keys = Object.keys(vehicles_form);

    for (let i = 0; i < form_keys.length; i++) {
        const selector = form_keys[i];
        const { selected_vehicle } = vehicles_form[selector];
        if (!selected_vehicle) return false;
    }
    return true;
}
