import { test, describe, expect } from '@jest/globals';
import { getUserOrders, newUserOrder, orderSliceReducer, setLastOrder } from './orderSlice';

describe('test order', () => {
    const initialState = {
        orders: [],
        lastOrder: null,
        orderRequestData: true,
        loading: true,
        orderCreate: true,
        error: null
    }

    const actualOrder = {
            "_id": "6a206ae76a172d001b98ba57",
            "ingredients": [
                "643d69a5c3f7b9001cfa093d",
                "643d69a5c3f7b9001cfa093e",
                "643d69a5c3f7b9001cfa0941",
                "643d69a5c3f7b9001cfa0946",
                "643d69a5c3f7b9001cfa093d"
            ],
            "status": "done",
            "name": "Минеральный флюоресцентный био-марсианский люминесцентный бургер",
            "createdAt": "2026-06-03T17:56:55.580Z",
            "updatedAt": "2026-06-03T17:56:55.641Z",
            "number": 106075
        };

    const initialStateUserPending = {
        orders: [],
        lastOrder: null,
        orderRequestData: false,
        loading: false,
        orderCreate: false,
        error: null
        };

    const initialStateNewUserPending = {
        orders: [],
        lastOrder: null,
        orderRequestData: false,
        loading: false,
        orderCreate: true,
        error: null
        }

    const initialStateNewOrder = {
            orders: [],
            lastOrder: null,
            orderRequestData: true,
            loading: true,
            orderCreate: false,
            error: null
        }

    const actualStateNewOrders = {
            "success": true,
            "order": actualOrder,
            "name": 'name'
        }

    test('test set last order', () => {
        const NewState = orderSliceReducer(initialState, setLastOrder(actualOrder));

        expect(NewState.lastOrder).toEqual(actualOrder);
    });
    test('test get user order pending', () => {
        const newState = orderSliceReducer(initialStateUserPending, getUserOrders.pending('loading'));

        expect(newState.loading).toBe(true);
    });
    test('test get user order rejected', () => {
        const newState = orderSliceReducer(initialState, getUserOrders.rejected(new Error('error'), 'test_id'));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
    });
    test('test get user order fulfilled', () => {

        const newState = orderSliceReducer(initialState, getUserOrders.fulfilled([actualOrder], 'test_id'));

        expect(newState.orders).toEqual([actualOrder]);
        expect(newState.loading).toBe(false);
    });
    test('test get new user order pending', () => {
        const newState = orderSliceReducer(initialStateNewUserPending, newUserOrder.pending('loading', []));

        expect(newState.loading).toBe(true);
        expect(newState.orderRequestData).toBe(true);
        expect(newState.orderCreate).toBe(false);
    });
    test('test get new user order rejected', () => {
        const newState = orderSliceReducer(initialState, newUserOrder.rejected(new Error('error'), 'test_id', []));

        expect(newState.error).toBe('error');
        expect(newState.loading).toBe(false);
        expect(newState.orderCreate).toBe(false);
        expect(newState.orderRequestData).toBe(false);
    });
    test('test get new user order fulfilled', () => {
        const newState = orderSliceReducer(initialStateNewOrder, newUserOrder.fulfilled(actualStateNewOrders, 'test_id', []));

        expect(newState.orders).toEqual([actualOrder]);
        expect(newState.lastOrder).toEqual(actualOrder);
        expect(newState.loading).toBe(false);
        expect(newState.orderRequestData).toBe(false);
        expect(newState.orderCreate).toBe(true);
    });
})
