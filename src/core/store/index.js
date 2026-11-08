import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { signUpApi } from '../../features/auth/register/store/signUpApi';
import { signInApi } from '../../features/auth/signin/store/signInApi';
import { securityApi } from '../../features/admin/settings/store/securityApi';
import { storefrontApi } from '../../features/admin/settings/store/storeFrontApi';
import { profileApi } from '../../features/admin/settings/store/profileApi';
import { transactionApi } from '../../features/admin/transactions/store/transactionApi';
import { addProductApi } from '../../features/admin/products/add-product/store/addProductApi';

const rootReducer = combineReducers({
	signUpApi: signUpApi.reducer,
	signInApi: signInApi.reducer,
	securityApi: securityApi.reducer,
	storefrontApi: storefrontApi.reducer,
	profileApi: profileApi.reducer,
	transactionApi: transactionApi.reducer,
	addProductApi: addProductApi.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([signUpApi.middleware, signInApi.middleware, transactionApi.middleware, addProductApi.middleware, securityApi.middleware, storefrontApi.middleware, profileApi.middleware, ]),
});
