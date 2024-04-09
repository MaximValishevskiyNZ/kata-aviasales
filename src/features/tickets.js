import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const fetchSearchIdAndTickets = createAsyncThunk(
    'tickets/fetchSearchIdAndTickets',
    async (_, {dispatch}) => {
        try {
            const searchIdResponse = await fetch('https://aviasales-test-api.kata.academy/search');
            const searchIdData = await searchIdResponse.json();
            const searchId = searchIdData.searchId;

            let tickets = [];
            let page = 0;

            while (true) { // We're going to keep trying until we've fetched all tickets
                try {
                    const ticketsResponse = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}&page=${page}`);
                    const ticketsData = await ticketsResponse.json();
                    tickets = [...tickets, ...ticketsData.tickets];
                    if (ticketsData.stop) { // If there are no more tickets, we stop the loop
                        break;
                    }
                    // Обновляем состояние при получении частичных данных
                    dispatch(updateTickets(tickets));
                } catch (error) {
                    console.error('Error fetching tickets:', error); // Log the error but don't stop the loop
                }
                page++;
            }

            return tickets;
        } catch (error) {
            throw new Error('Error fetching data:', error);
        }
    }
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
        updateTickets: (state, action) => {
            state.tickets = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchIdAndTickets.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchIdAndTickets.fulfilled, (state, action) => {
                state.loading = false;
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

export const {updateTickets, setOrder, setFilters} = ticketsSlice.actions;

export default ticketsSlice.reducer;