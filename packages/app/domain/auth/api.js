export const createApi = (http) => ({
    signIn: ({ username }) =>
        http.request({
            url: '/auth/session/',
            method: 'post',
            data: { username },
        }),
    signOut: () =>
        http.request({
            url: '/auth/session/',
            method: 'delete',
        }),
    getAuthenticatedUser: ({ token }) =>
        http.request({
            url: '/auth/me/',
            method: 'get',
        }),
})
