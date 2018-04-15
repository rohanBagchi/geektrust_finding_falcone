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
