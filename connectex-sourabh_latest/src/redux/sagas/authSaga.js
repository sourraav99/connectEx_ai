// // src/redux/sagas/authSaga
// import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
// import firestore from '@react-native-firebase/firestore';
// import ZegoUIKitPrebuiltCallService from '@zegocloud/zego-uikit-prebuilt-call-rn';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { loginRequest, loginSuccess, loginFailure } from '../reducer/authSlice';
// const yourAppID = 1091612176;
// const yourAppSign = "81706b86bcb8ebda3e28e4c3aa68eacb60c3452d802c5bcc7339de20f153506c";


// Worker Saga: Handles login
import { call, put, takeLatest } from "redux-saga/effects";
import { LOGIN_ACTION, VERIFY_EMAIL_ACTION, SIGNUP_ACTION, GET_ALL_USERS_ACTION, GET_SELF_PROFILE_ACTION, GET_SELF_PROFILE_REDUCER, EDIT_PROFILE_ACTION, FETCH_KEYWORD_ACTION, GET_USERS_BY_EXPERTISE_AREA } from "../action/types";
import axios from "../../utils/axiosConfig";
import { BASE_URL, END_POINTS } from "../../utils/config";

function* login(payload) {
    let formData = new FormData()
    Object.keys(payload).forEach(element => {
        formData.append(element, payload[element])
    });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.LOGIN}`, formData)
}
export function* loginSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(login, action.payload);
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('Login failed:', error);
        action.callBack(error)
    }
}

function* signup(payload) {
    let formData = new FormData()
    Object.keys(payload).forEach(element => {
        formData.append(element, payload[element])
    });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.SIGNUP}`, formData)
}
export function* signupSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(signup, action.payload);
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('signup failed:', error);
        action.callBack(error)
    }
}



function* verifyEmail(payload) {
    let formData = new FormData()
    Object.keys(payload).forEach(element => {
        formData.append(element, payload[element])
    });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.post(`${BASE_URL}${END_POINTS.VERIFY_EMAIL}`, formData)
}
export function* verifyEmailSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(verifyEmail, action.payload);
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('verify Email failed:', error);
        action.callBack(error)
    }
}


function* getUsers() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_ALL_USERSPROFILE}`);
}
function* getAllUsersSaga(action) {
    try {
        const response = yield call(getUsers)
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}


function* getSelfProfile() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_SELF_PROFILE}`);
}
function* getSelfProfileSaga(action) {
    try {
        const response = yield call(getSelfProfile)
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}


function* editProfile(payload) {
    let formData = new FormData()
    Object.keys(payload).forEach(element => {
        console.log('skills saga type ------->>>>>>', element, Array.isArray(payload[element]));

        formData.append(element, Array.isArray(payload[element]) ? JSON.stringify(payload[element]) : payload[element]);

    });
    // console.log(`${END_POINTS.AUTH}/login`,"**********************8")
    return yield axios.put(`${BASE_URL}${END_POINTS.EDIT_PROFILE}`, formData)
}
export function* editProfileSaga(action) {
    try {
        // console.log('action--->>>>', action);
        const response = yield call(editProfile, action.payload);
        // console.log('response=======>>>>>>>+++++', response.data);
        action.callBack(response)
    } catch (error) {
        console.error('EDIT PROFILE failed:', error);
        action.callBack(error)
    }
}


function* fetchKeywords() {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.FETCH_KEYWORDS}`);
}
function* fetchKeywordsSaga(action) {
    try {
        const response = yield call(fetchKeywords)
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}

function* fetchUsersByExpertise(payload) {
    return yield call(axios.get, `${BASE_URL}${END_POINTS.GET_USERS_BY_EXPERTISE}?expertiseArea=${payload.expertiseArea}`);
}
function* fetchUsersByExpertisSaga(action) {
    try {
        const response = yield call(fetchUsersByExpertise,action.payload)
        action.callBack(response)
    } catch (error) {
        action.callBack(error)
    }
}

export function* authSaga() {
    yield takeLatest(LOGIN_ACTION, loginSaga);
    yield takeLatest(SIGNUP_ACTION, signupSaga);
    yield takeLatest(VERIFY_EMAIL_ACTION, verifyEmailSaga);
    yield takeLatest(GET_ALL_USERS_ACTION, getAllUsersSaga);
    yield takeLatest(GET_SELF_PROFILE_ACTION, getSelfProfileSaga);
    yield takeLatest(EDIT_PROFILE_ACTION, editProfileSaga);
    yield takeLatest(FETCH_KEYWORD_ACTION, fetchKeywordsSaga);
    yield takeLatest(GET_USERS_BY_EXPERTISE_AREA, fetchUsersByExpertisSaga);
}
export default authSaga;