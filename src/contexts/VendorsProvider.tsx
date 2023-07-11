import Breadcrumbs from "@/components/widgets/Breadcrumbs";
import { vendors as vendors_data } from "@/constants/data";
import { IVendors } from "@/interfaces/tables.interface";
import { Main } from "@/layouts/Main";
import { createContext, FC, ReactNode, useCallback, useState } from "react";

interface VendorsProviderProps {
  children: ReactNode;
}

export const VendorsContext = createContext<{
  vendors: IVendors[];
  addVendor?: (payload: IVendors) => void;
  removeVendor?: (id: string | number) => void;
}>({
  vendors: [
    {
      balance: 0,
      created_at: "",
      email: "",
      itm_stock: 0,
      phone: "",
      status: "",
      vendor_name: "",
    },
  ],
});

const VendorsProvider: FC<VendorsProviderProps> = ({ children }) => {
  const [vendors, setVendors] = useState([...vendors_data]);
  const addVendor = useCallback(
    (payload: IVendors) => {
      setVendors([...vendors, { ...payload }]);
    },
    [vendors]
  );
  const removeVendor = useCallback(
    (id: string | number) => {
      const newVendors = vendors.filter((_, idx) => idx !== id);
      setVendors(newVendors);
    },
    [vendors]
  );
  return (
    <VendorsContext.Provider value={{ addVendor, removeVendor, vendors }}>
      <Main breadcrumbs={<Breadcrumbs />}>{children}</Main>
    </VendorsContext.Provider>
  );
};

export default VendorsProvider;
