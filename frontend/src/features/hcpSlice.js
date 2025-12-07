import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchHcps = createAsyncThunk('hcp/fetchHcps', async () => {
    const response = await axios.get(`${API_URL}/hcps`);
    return response.data;
});

export const sendChatMessage = createAsyncThunk('hcp/sendChatMessage', async (message) => {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return { role: 'ai', content: response.data.response };
});

export const logInteractionManual = createAsyncThunk('hcp/logInteractionManual', async (interactionData) => {
    const response = await axios.post(`${API_URL}/interactions`, interactionData);
    return response.data;
});

const hcpSlice = createSlice({
    name: 'hcp',
    initialState: {
        hcps: [],
        chatHistory: [], // { role: 'user' | 'ai', content: string }
        status: 'idle',
        error: null,
    },
    reducers: {
        addMessage: (state, action) => {
            state.chatHistory.push(action.payload);
        },
        clearChat: (state) => {
            state.chatHistory = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHcps.fulfilled, (state, action) => {
                state.hcps = action.payload;
            })
            .addCase(sendChatMessage.fulfilled, (state, action) => {
                state.chatHistory.push(action.payload);
            })
            .addCase(sendChatMessage.pending, (state) => {
                // Optional: Handle loading state for chat
            })
            .addCase(sendChatMessage.rejected, (state, action) => {
                state.error = action.error.message;
            });
    },
});

export const { addMessage, clearChat } = hcpSlice.actions;
export default hcpSlice.reducer;
