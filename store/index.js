import { configureStore, createSlice } from '@reduxjs/toolkit';
const leadSlice = createSlice({ name:'lead', initialState:{ source:'', pkg:'' }, reducers:{ setLead(s,a){ s.source=a.payload.source||''; s.pkg=a.payload.pkg||''; } } });
export const { setLead } = leadSlice.actions;
export const store = configureStore({ reducer:{ lead: leadSlice.reducer } });
