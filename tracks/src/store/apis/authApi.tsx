import { api } from './api';

export const authApi = api.injectEndpoints({
    endpoints(builder) {
        return {
            signup: builder.mutation({
                query: ({ email, password }) => {
                    return {
                        method: 'POST',
                        url: '/signup',
                        body: {
                            email,
                            password,
                        },
                    };
                },
            }),
            signin: builder.mutation({
                query: ({ email, password }) => {
                    return {
                        method: 'POST',
                        url: '/signin',
                        body: {
                            email,
                            password,
                        },
                    };
                },
            }),
        };
    },
});

export const { useSignupMutation, useSigninMutation } = authApi;
