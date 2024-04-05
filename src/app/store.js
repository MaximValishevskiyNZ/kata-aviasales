import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../features/tickets.js';

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
});

export default store;
