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
    return lib.isAllPlanetsSelected(planets_form) && lib.isAllVehiclesSelected(vehicles_form);
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

/**
 * this aides in mocking during tests.
 * check http://luetkemj.github.io/170421/mocking-modules-in-jest/
 */
export const lib = {
    isAllPlanetsSelected,
    isAllVehiclesSelected
};

export function getAvailablePlanets({ planets, form, selected_planet }) {
    const not_selected_planets = getNotSelectedPlanets(planets, form);
    const current_selected_planet = getCurrentSelectedPlanet(planets, selected_planet);
    const available_planets = [...not_selected_planets];
    current_selected_planet && available_planets.push(current_selected_planet);
    return available_planets;
}

export function getNotSelectedPlanets(planets, form) {
    const selected_planets = getSelectedPlanets(form);
    return planets.filter(planet => selected_planets.indexOf(planet.name) === -1);
}

export function getCurrentSelectedPlanet(planets, selected_planet) {
    if (!selected_planet) return;
    return planets.filter(planet => planet.name === selected_planet)[0];
}

export function getAvailableVehicles({ vehicles, form }) {
    const selected_vehicles = getSelectedVehicles(form);
    return vehicles.map(vehicle => {
        let count = vehicle.total_no;
        for (let i = 0; i < selected_vehicles.length; i++) {
            const selected_vehicle = selected_vehicles[i];
            if (vehicle.name === selected_vehicle) {
                count -= 1;
                selected_vehicles[i] = null;
            }
        }

        return {
            name: vehicle.name,
            max_distance: vehicle.max_distance,
            count,
        };
    });
}

export function shouldRenderVehicleSelector(selector, planet_form) {
    const { selected_planet } = getSelectedPlanetFormData(selector, planet_form);
    return !!selected_planet;
}

export function getSelectedPlanetFormData(selector, planet_form) {
    return planet_form[selector];
}

export function getSelectedPlanet(selector, planet_form, planets) {
    const { selected_planet } = getSelectedPlanetFormData(selector, planet_form);
    if (!selected_planet) return;

    return planets.filter(planet => planet.name === selected_planet)[0];
}
