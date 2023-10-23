import { api } from './api';

const trackApi = api.injectEndpoints({
    endpoints(builder) {
        return {
            fetchTracks: builder.query({
                providesTags: ['Tracks'],
                query: () => {
                    return {
                        url: '/tracks',
                        method: 'GET',
                    };
                },
            }),
            createTrack: builder.mutation({
                invalidatesTags: ['Tracks'],
                query: ({ name, locations }) => {
                    return {
                        method: 'POST',
                        url: '/tracks',
                        body: {
                            name: name,
                            locations: locations,
                        },
                    };
                },
            }),
        };
    },
});

export const { useFetchTracksQuery, useCreateTrackMutation } = trackApi;
