import axios from "axios";
import { BASE_URL, END_POINTS } from "../../utils/config";
import { call, takeLatest } from "redux-saga/effects";
import { GET_EXPERTISE_ACTION } from "../action/types";

function* getExpertise() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_EXPERTISE}`);
}
function* getExpertiseSaga(action) {
    try {
        const response = yield call(getExpertise)
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}

export function* expertiseSaga() {
    yield takeLatest(GET_EXPERTISE_ACTION, getExpertiseSaga);
}
export default expertiseSaga;
