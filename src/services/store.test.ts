import { test, describe, expect } from '@jest/globals';
import { rootReducer } from './store';

describe('test reducer', () => {
  test('initial state', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('constructorItems');
    expect(initialState).toHaveProperty('feeds');
    expect(initialState).toHaveProperty('auth');
    expect(initialState).toHaveProperty('order');

    expect(initialState).toEqual({
      ingredients: {
        ingredients: [],
        loadingData: true,
        error: null
      },
      constructorItems: {
        constructorBun: null,
        constructorIngredients: []
      },
      feeds: {
        orders: [],
        total: 0,
        totalToday: 0,
        loadingData: true,
        error: null,
        orderByNumber: null,
        success: false
      },
      auth: {
        success: false,
        user: {
          email: '',
          name: ''
        },
        loading: false,
        error: null
      },
      order: {
        orders: [],
        lastOrder: null,
        orderRequestData: false,
        loading: false,
        orderCreate: false,
        error: null
      }
    });
  });
});
