import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getAllFeeds, getOrdersData } from '../../services/slices/FeedsSlice';
import { getOrderCreate } from '../../services/slices/orderSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrdersData);
  const dispatch = useDispatch();

  const orderCreate = useSelector(getOrderCreate);

  useEffect(() => {
    dispatch(getAllFeeds());
  }, [dispatch]);

  useEffect(() => {
    if (orderCreate) dispatch(getAllFeeds());
  }, [orderCreate, dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getAllFeeds())} />
  );
};
