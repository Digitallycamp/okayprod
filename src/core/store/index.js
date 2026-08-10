import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { signUpApi } from '../../features/auth/register/store/signUpApi';
import { signInApi } from '../../features/auth/signin/store/signInApi';

const rootReducer = combineReducers({
	signUpApi: signUpApi.reducer,
	signInApi: signInApi.reducer,
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([signUpApi.middleware, signInApi.middleware]),
});
