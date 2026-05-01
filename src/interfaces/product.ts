interface ProductType {
  id: number;
  name: string;
  price: number;
  unit: string;
  is_active?: true;
  min_stock?: number;
  stock_quantity?: number;
  type?: string;
  file_name?: string;
  created_at?: string;
  updated_at?: string;
}

interface cartItemType {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type userType = {
  created_at?: string;
  email: string;
  id?: string;
  is_verified?: false;
  name: string;
  password?: string;
  phone_number?: string;
  picture?: string;
  role?: string;
};

type SetCartType = (cart: cartItemType[]) => void;
