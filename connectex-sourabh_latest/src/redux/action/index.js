//  src/redux/action/index
import * as TYPES from './types'

export const loginAction = (payload, callBack) => ({
    type: TYPES['LOGIN_ACTION'], payload, callBack
})

export const signupAction = (payload, callBack) => ({
    type: TYPES['SIGNUP_ACTION'], payload, callBack
})


export const verifyEmailAction = (payload, callBack) => ({
    type: TYPES['VERIFY_EMAIL_ACTION'], payload, callBack
})

export const getAllUsersAction = (callBack) => ({
    type: TYPES['GET_ALL_USERS_ACTION'], callBack
})

export const getSelfProfileAction = (callBack) => ({
    type: TYPES['GET_SELF_PROFILE_ACTION'], callBack
})

export const editProfileAction = (payload, callBack) => ({
    type: TYPES['EDIT_PROFILE_ACTION'], payload, callBack
})

export const fetchKeywordAction = (callBack) => ({
    type: TYPES['FETCH_KEYWORD_ACTION'], callBack
})

export const getExpertiseAction = (callBack) => ({
    type: TYPES['GET_EXPERTISE_ACTION'], callBack
})

export const getUsersByExpertiseArea = (payload,callBack) => ({
    type: TYPES['GET_USERS_BY_EXPERTISE_AREA'],payload, callBack
})