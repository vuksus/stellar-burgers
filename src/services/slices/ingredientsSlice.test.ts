import { test, describe, expect } from '@jest/globals';
import { getIngredients, ingredientsSliceReducer } from './ingredientsSlice';

describe('test ingredients', () => {
    const initialState = {
        ingredients: [],
        loadingData: true,
        error: null
    }

    const initialStatePending = {
            ingredients: [],
            loadingData: false,
            error: null
        }

    const actualState = [{
            "_id": "643d69a5c3f7b9001cfa093c",
            "name": "Краторная булка N-200i",
            "type": "bun",
            "proteins": 80,
            "fat": 24,
            "carbohydrates": 53,
            "calories": 420,
            "price": 1255,
            "image": "https://code.s3.yandex.net/react/code/bun-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
            "__v": 0
        }]

    test('ingredient pending', () => {
        const newState = ingredientsSliceReducer(initialStatePending, getIngredients.pending('loading'));

        expect(newState.loadingData).toBe(true)
    });
    test('ingredient rejected', () => {
        const newState = ingredientsSliceReducer(initialState, getIngredients.rejected(new Error('error'), 'test_id'))

        expect(newState.error).toBe('error');
        expect(newState.loadingData).toBe(false);
    });
    test('ingredient fulfilled', async () => {
        const newState = ingredientsSliceReducer(initialState, getIngredients.fulfilled(actualState, 'test_id'));

        expect(newState.ingredients).toEqual(actualState);
        expect(newState.loadingData).toBe(false);
    });
})
