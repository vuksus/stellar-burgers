import { test, describe, expect } from '@jest/globals';
import { feedsSliceReducer, getAllFeeds, getOrderByNumber } from './FeedsSlice';

describe('test feeds', () => {
    const initialState = {
        orders: [],
        total: 0,
        totalToday: 0,
        loadingData: true,
        error: null,
        orderByNumber: null,
        success: false
    };

    const initialStateFeedsPending = {
        orders: [],
        total: 0,
        totalToday: 0,
        loadingData: false,
        error: null,
        orderByNumber: null,
        success: false
    };

    const actualOrders = [{
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
        }];

    const actualStateOrder = {
            "success": true,
            "orders": actualOrders
        }

    test('test all feeds pending', () => {
    const newState = feedsSliceReducer(initialStateFeedsPending, getAllFeeds.pending('loading'));

    expect(newState.loadingData).toBe(true);
    });
    test('test all feeds rejected', () => {
        const newState = feedsSliceReducer(initialState, getAllFeeds.rejected(new Error('error'), 'tests_id'));

        expect(newState.error).toBe('error');
        expect(newState.loadingData).toBe(false);
    });
    test('test all feeds fulfilled', () => { 
        const newState = feedsSliceReducer(initialState, getAllFeeds.fulfilled({
            "success": true,
            "orders": actualOrders,
            "total": 1,
            "totalToday": 1
        }, 'test_id'))

        expect(newState.orders).toEqual(actualOrders);
        expect(newState.loadingData).toBe(false);
    });
    test('test order by number pending', () => {
    const newState = feedsSliceReducer(initialStateFeedsPending, getOrderByNumber.pending('string', 1));

    expect(newState.loadingData).toBe(true);
    });
    test('test order by number rejected', () => {
        const newState = feedsSliceReducer(initialState, getOrderByNumber.rejected(new Error('error'), 'tests_id', 1));

        expect(newState.error).toBe('error');
        expect(newState.loadingData).toBe(false);
    });
    test('test order by number fulfilled', () => {
        const newState = feedsSliceReducer(initialState, getOrderByNumber.fulfilled(actualStateOrder, 'test_id', 1));

        expect(newState.orderByNumber?.orders).toEqual(actualOrders);
        expect(newState.loadingData).toBe(false);
    });
})
