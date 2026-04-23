interface product {
  name: string;
  price: number;
  unit: string;
  is_active?: true;
  min_stock?: number;
  stock_quantity?: number;
  type?: string;
  isAdded?: boolean;
  file_name?: string;
  created_at?: string;
  updated_at?: string;
}
