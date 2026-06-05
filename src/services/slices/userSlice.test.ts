import { test, describe, expect } from '@jest/globals';
import { clearError, getUserAuth, loginUser, makeLoginUserSuccess, registerUser, updateUserData, userLogout, userSliceReducer } from './userSlice';

describe('test user', () => {
    const initialState = {
        success: true,
        user: {
            email: '',
            name: ''
        },
        loading: false,
        error: null
    };

    const initialStateRejected = {
            success: true,
            user: {
                email: '',
                name: ''
            },
            loading: true,
            error: null
        };

    const initialStateFulfilled = {
            success: false,
            user: {
                email: '',
                name: ''
            },
            loading: true,
            error: null
        };
    
    const registerData = {
            email: 'email',
            password: 'password'
        }

    const registerDataName = {
        name: 'name',
        email: 'email',
        password: 'password'
    }

    const userInfo = {
                email: 'email',
                name: 'name'
            }
        
    const actualAuthResponse = {
            success: true,
            refreshToken: '',
            accessToken: '',
            user: userInfo
        }

    const userResponse = {
            success: true,
            user: userInfo
        }

    test('test login user success', () => {
        const newState = userSliceReducer(initialState, makeLoginUserSuccess(true));

        expect(newState.success).toBe(true);
    });
    test('test clear error', () => {
        const initialStateError = {
            success: false,
            user: {
                email: '',
                name: ''
            },
            loading: false,
            error: 'error'
        }

        const newState = userSliceReducer(initialStateError, clearError())

        expect(newState.error).toBeNull();
    });
    test('test get user auth pending', () => {
        const newState = userSliceReducer(initialState, getUserAuth.pending('loading'));

        expect(newState.loading).toBe(true);
        expect(newState.success).toBe(false);
    });
    test('test get user auth rejected', () => {
        const newState = userSliceReducer(initialStateRejected, getUserAuth.rejected(new Error('error'), 'test_id'));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
        expect(newState.success).toBe(false);
    });
    test('test get user auth fulfilled', () => {
        const newState = userSliceReducer(initialStateFulfilled, getUserAuth.fulfilled(userResponse, 'test_id'));

        expect(newState.user).toEqual(userInfo);
        expect(newState.success).toBe(true);
        expect(newState.loading).toBe(false);
    });
    test('test login user pending', () => {
        const newState = userSliceReducer(initialState, loginUser.pending('loading', registerData));

        expect(newState.loading).toBe(true);
        expect(newState.success).toBe(false);
    });
    test('test login user rejected', () => {
        const newState = userSliceReducer(initialStateRejected, loginUser.rejected(new Error('error'), 'test_id', registerData));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
        expect(newState.success).toBe(false);
    });
    test('test login user fulfilled', () => {
        const newState = userSliceReducer(initialStateFulfilled, loginUser.fulfilled(actualAuthResponse, 'test_id', registerData));

        expect(newState.user).toEqual(userInfo);
        expect(newState.success).toBe(true);
        expect(newState.loading).toBe(false);
    });
    test('test register user pending', () => {
        const newState = userSliceReducer(initialState, registerUser.pending('loading', registerDataName));

        expect(newState.loading).toBe(true);
        expect(newState.success).toBe(false);
    });
    test('test register user rejected', () => {
        const newState = userSliceReducer(initialStateRejected, registerUser.rejected(new Error('error'), 'test_id', registerDataName));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
        expect(newState.success).toBe(false);
    });
    test('test register user fulfilled', () => {
        const newState = userSliceReducer(initialStateFulfilled, registerUser.fulfilled(actualAuthResponse, 'test_id', registerDataName));

        expect(newState.user).toEqual(userInfo);
        expect(newState.success).toBe(true);
        expect(newState.loading).toBe(false);
    });
    test('test update user data pending', () => {
        const newState = userSliceReducer(initialState, updateUserData.pending('loading', registerData));

        expect(newState.loading).toBe(true);
    });
    test('test update user data rejected', () => {
        const newState = userSliceReducer(initialStateRejected, updateUserData.rejected(new Error('error'), 'test_id', registerData));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
    });
    test('test update user data fulfilled', () => {
        const newState = userSliceReducer(initialStateFulfilled, updateUserData.fulfilled(userResponse, 'test_id', registerData));

        expect(newState.user).toEqual(userInfo);
        expect(newState.loading).toBe(false);
    });
    test('test user logout pending', () => {
        const newState = userSliceReducer(initialState, userLogout.pending('loading'));

        expect(newState.loading).toBe(true);
        expect(newState.success).toBe(false);
    });
    test('test user logout rejected', () => {
        const newState = userSliceReducer(initialStateRejected, userLogout.rejected(new Error('error'), 'test_id'));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
        expect(newState.success).toBe(false);
    });
    test('test user logout fulfilled', () => {
        const newState = userSliceReducer(initialStateFulfilled, userLogout.fulfilled({success: true}, 'test_id'));

        expect(newState.user).toEqual(initialStateFulfilled.user);
        expect(newState.loading).toBe(false);
        expect(newState.success).toBe(false);
    });
})
