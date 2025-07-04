import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducer/user.reducer'; // Make sure to import from the correct file
import rootSaga from './sagas/index'; // Your saga file for handling side effects


// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        auth: authReducer, // authReducer should be the reducer created using createSlice
        // profileData: userProfileReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Adding sagaMiddleware to the default middleware
});

sagaMiddleware.run(rootSaga); // Run the root saga (this is where you define your side effects)

export default store;
