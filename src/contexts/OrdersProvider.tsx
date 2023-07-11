import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { orderData } from "@/constants/data";
import { IOrder, IOrederContext } from "@/interfaces/tables.interface";
import { Main } from "@/layouts/Main";
import { FC, ReactNode, createContext, useCallback, useState } from "react";

interface OrdersProviderProps {
  children: ReactNode;
}

export interface IOrderContext {
  isOpen: boolean;
  toggleOrderButton: () => void;
  orders: IOrder[];
  addOrder?: (payload: IOrder) => void;
  removeOrder?: (id: string | number) => void;
}

// {
//   orders: [
//     {
//       id: 0,
//       buyers_name: '',
//       item_name: "",
//       amount: 0,
//       order_date: "",
//       delivery_date: '';
//       method_of_payment: '';
//       delivery_status: '';
//     },
//   ],
// }

export const OrdersContext = createContext<IOrderContext | null>(null);

export const OrdersProvider: FC<OrdersProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [orders, setOrders] = useState([...orderData]);

  const toggleOrderButton = () => setIsOpen((prev) => !prev);

  const addOrder = useCallback(
    (payload: IOrder) => {
      setOrders([...orders, { ...payload }]);
    },
    [orders]
  );

  const removeOrder = useCallback(
    (id: string | number) => {
      const newOrders = orders.filter((_, idx) => idx !== id);
      setOrders(newOrders);
    },
    [orders]
  );

  return (
    <OrdersContext.Provider
      value={{ isOpen, toggleOrderButton, addOrder, removeOrder, orders }}
    >
      <Main breadcrumbs={<Breadcrumbs />}>{children}</Main>
    </OrdersContext.Provider>
  );
};
