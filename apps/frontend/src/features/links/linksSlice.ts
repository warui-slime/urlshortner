import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Link {
  id: string;
  longUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

interface LinksState {
  data: Link[];
  loading: boolean;
  error: string | null;
}

const initialState: LinksState = {
  data: [],
  loading: false,
  error: null
};

const linksSlice = createSlice({
  name: 'links',
  initialState,
  reducers: {
    getLinksStart(state) {
      state.loading = true;
      state.error = null;
    },
    getLinksSuccess(state, action: PayloadAction<Link[]>) {
      state.data = action.payload;
      state.loading = false;
    },
    getLinksFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createLinkSuccess(state, action: PayloadAction<Link>) {
      state.data.unshift(action.payload);
    }
  }
});

export const { getLinksStart, getLinksSuccess, getLinksFailure, createLinkSuccess } = linksSlice.actions;
export default linksSlice.reducer;