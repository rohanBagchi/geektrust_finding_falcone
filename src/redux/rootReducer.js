import { combineReducers } from "redux";
import VehicleDucks from "./VehicleDucks";
import PlanetDucks from "./PlanetDucks";
import AppDucks from "./AppDucks";

export default combineReducers({
    app_reducer: AppDucks,
    vehicle_reducer: VehicleDucks,
    planet_reducer: PlanetDucks,
});
