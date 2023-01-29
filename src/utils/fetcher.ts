import axios, { type AxiosRequestConfig } from "axios"

const fetcher = (token: string | null, url: string, options?: AxiosRequestConfig) => {
    return axios(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${token}`,
            ...options?.headers,
        }
    })
}

export default fetcher