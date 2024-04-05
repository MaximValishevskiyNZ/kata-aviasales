import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchIdAndTickets = createAsyncThunk(
  'tickets/fetchSearchIdAndTickets',
  async () => {
    try {
      const searchIdResponse = await fetch(
        'https://aviasales-test-api.kata.academy/search',
      );
      const searchIdData = await searchIdResponse.json();
      const searchId = searchIdData.searchId;

      const ticketsResponse = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
      );
      const ticketsData = await ticketsResponse.json();

      return ticketsData.tickets;
    } catch (error) {
      throw new Error('Error fetching data:', error);
    }
  },
);

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: null,
    order: 'a',
    filters: ['Без пересадок', '1 пересадка', '2 пересадки'],
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchIdAndTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchIdAndTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchSearchIdAndTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const selectTickets = (state) => state.tickets.tickets;
export const selectOrder = (state) => state.tickets.order;
export const selectFilters = (state) => state.tickets.filters;

export const { setOrder, setFilters } = ticketsSlice.actions;

export default ticketsSlice.reducer;
