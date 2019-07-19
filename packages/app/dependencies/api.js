import axios from 'axios'

export const createHTTPClient = (config, { storage }) => {
    const http = axios.create(config)
    http.interceptors.request.use((config) => {
        config.headers['Authorization'] = 'Bearer ' + storage.get('auth_token')
        return config
    })
    http.interceptors.response.use(
        (response) => response.data,
        (error) => ({ error: error.response })
    )

    return http
}
