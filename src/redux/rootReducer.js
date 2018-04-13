import { combineReducers } from "redux";
import VehicleDucks from "./VehicleDucks";



export default combineReducers({
    vehicle_reducer: VehicleDucks
});
