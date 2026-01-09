import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  category: string;
  rating: number;
}

interface ProductStates {
  products: Product[];
  skip: number;
}

const initialState: ProductStates = {
  products: [],
  skip: 0,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductData: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    setSkip: (state, action: PayloadAction<number>) => {
      state.skip = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getProductData, setSkip } = productsSlice.actions;

export default productsSlice.reducer;
