import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { useDispatch } from '../../services/store';
import { getUserAuthStatus } from '../../services/slices/userSlice';
import {
  getLastOrder,
  getOrderRequestStatus,
  newUserOrder,
  setLastOrder
} from '../../services/slices/orderSlice';
import {
  getConstructorBun,
  getConstructorIngredients,
  resetConstructor
} from '../../services/slices/constructorSlice';
import { getAllFeeds } from '../../services/slices/FeedsSlice';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(getUserAuthStatus);
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorIngredients = useSelector(getConstructorIngredients);
  const constructorBun = useSelector(getConstructorBun);
  const dispatch = useDispatch();
  const constructorItems = {
    bun: constructorBun,
    ingredients: constructorIngredients
  };
  const orderRequest = useSelector(getOrderRequestStatus);

  const orderModalData = useSelector(getLastOrder);

  const onOrderClick = () => {
    if (!isAuthenticated) {
      return navigate('/login');
    }
    if (!constructorItems.bun || orderRequest) return;
    const ingredientsId: string[] = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map(
        (item: TConstructorIngredient) => item._id
      )
    ];

    dispatch(newUserOrder(ingredientsId))
      .unwrap()
      .then(() => dispatch(resetConstructor()));
    dispatch(getAllFeeds());
  };
  const closeOrderModal = () => dispatch(setLastOrder(null));

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
