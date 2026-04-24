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

type SetCartType = (cart: cartItemType[]) => void;
