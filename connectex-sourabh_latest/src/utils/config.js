
// export const BASE_URL = 'http://13.232.62.46:3000/'
export const BASE_URL = 'https://conectexapi.markletechandmedia.com/api/v1'
// export const BASE_URL = 'http://192.168.1.6:7002/api/v1'
// export const IMAGE_BASE_URL = 'http://192.168.1.6:7002/public/profileImage'

export const IMAGE_BASE_URL = 'https://conectexapi.markletechandmedia.com/public/profileImage'
export const EXPERISE_IMAGE_BASE_URL = 'https://conectexapi.markletechandmedia.com/public/expertiseImages'


export const END_POINTS = {
    LOGIN: `/auth/login`,
    SIGNUP: `/auth/signup`,
    GET_ALL_USERSPROFILE: `/auth/users/exclude-self`,
    VERIFY_EMAIL: `/auth/verify-email`,
    GET_SELF_PROFILE: `/auth/user-profile`,
    EDIT_PROFILE: `/auth/user-edit`,
    FETCH_KEYWORDS: `/keyword/active`,
    GET_EXPERTISE:`/expertise/all`,
    GET_USERS_BY_EXPERTISE:`/auth/expertise-user`
}