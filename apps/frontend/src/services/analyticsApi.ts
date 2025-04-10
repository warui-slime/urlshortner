import { baseApi } from './baseApi';

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAnalytics: builder.query({
      query: () => `/analytics`,
      providesTags: ['Analytics'],
    }),
    getLinkAnalytics: builder.query({
      query: (linkId) => `/analytics/${linkId}`,
      providesTags: (_result, _error, linkId) => [{ type: 'Analytics', id: linkId }]
    })
  })
});

export const { 
  useGetAnalyticsQuery,
  useGetLinkAnalyticsQuery 
} = analyticsApi;