import { createSlice } from '@reduxjs/toolkit';
import { analyticsApi } from '@/services/analyticsApi';

interface AnalyticsState {
  data: {
    timeSeries: { date: string; clicks: number }[];
    devices: { device: string; count: number }[];
  };
}

const initialState: AnalyticsState = {
  data: {
    timeSeries: [],
    devices: []
  }
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      analyticsApi.endpoints.getAnalytics.matchFulfilled,
      (state, { payload }) => {
        state.data = payload;
      }
    );
  }
});

export default analyticsSlice.reducer;