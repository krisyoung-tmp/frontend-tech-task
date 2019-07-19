export const createApi = (http) => ({
    getAll: () =>
        http.request({
            url: '/users',
            method: 'get',
        }),
})
