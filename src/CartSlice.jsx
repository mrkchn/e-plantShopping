import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    totalQty: 0,
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost } = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
          existingItem.quantity++;
        } 
        else {
          state.items.push({ name, image, cost, quantity: 1 });
        }
        state.totalQty++;
    },
    removeItem: (state, action) => {
        const name = action.payload;
        const itemToRemove = state.items.find(item => item.name === name);
        state.items = state.items.filter(item => item !== itemToRemove);
        state.totalQty -= itemToRemove.quantity
    },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        console.log(name + ": " + quantity)
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            state.totalQty = state.totalQty + (quantity - itemToUpdate.quantity);
            itemToUpdate.quantity = quantity;
        }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
