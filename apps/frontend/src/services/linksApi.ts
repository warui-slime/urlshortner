import { baseApi } from './baseApi';
import { CreateLinkRequest, Link } from '@/types/links';

export const linksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLinks: builder.query<Link[], void>({
      query: () => '/links',
      providesTags: ['Link']
    }),
    createLink: builder.mutation<Link, CreateLinkRequest>({
      query: (newLink) => ({  
        url: `/links`,
        method: 'POST',
        body: newLink
      }),
      invalidatesTags: ['Link']
    })
  })
});


export const { 
  useGetLinksQuery,   
  useCreateLinkMutation 
} = linksApi;