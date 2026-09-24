import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { signUpApi } from '../../features/auth/register/store/signUpApi';
import { signInApi } from '../../features/auth/signin/store/signInApi';
import { securityApi } from '../../features/admin/settings/store/securityApi';
import { storefrontApi } from '../../features/admin/settings/store/storeFrontApi';
import { profileApi } from '../../features/admin/settings/store/profileApi';
import { transactionApi } from '../../features/admin/transactions/store/transactionApi';

const rootReducer = combineReducers({
	signUpApi: signUpApi.reducer,
	signInApi: signInApi.reducer,
	securityApi: securityApi.reducer,
	storefrontApi: storefrontApi.reducer,
	profileApi: profileApi.reducer,
	transactionApi: transactionApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([
			signUpApi.middleware,
			signInApi.middleware,
			securityApi.middleware,
			storefrontApi.middleware,
			profileApi.middleware,
      transactionApi.middleware,
		]),
});
