import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { signUpApi } from '../../features/auth/register/store/signUpApi';
import { signInApi } from '../../features/auth/signin/store/signInApi';
import { transactionApi } from '../../features/admin/transactions/store/transactionApi';
import { addProductApi } from '../../features/admin/products/add-product/store/addProductApi';

const rootReducer = combineReducers({
	signUpApi: signUpApi.reducer,
	signInApi: signInApi.reducer,
	transactionApi: transactionApi.reducer,
	addProductApi: addProductApi.reducer,
});
export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat([signUpApi.middleware, signInApi.middleware, transactionApi.middleware, addProductApi.middleware,]),
});
