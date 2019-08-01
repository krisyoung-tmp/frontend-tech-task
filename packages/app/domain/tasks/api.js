export const createApi = (http) => ({
    getAll: () =>
        http.request({
            url: '/tasks/',
            method: 'get',
        }),
    create: (data) =>
        http.request({
            url: '/tasks/',
            method: 'post',
            data,
        }),
    update: (data) =>
        http.request({
            url: `/tasks/${data.id}/`,
            method: 'put',
            data,
        }),
    destroy: (id) =>
        http.request({
            url: `/tasks/${id}/`,
            method: 'delete',
        }),
})
