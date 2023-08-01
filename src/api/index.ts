import qs from 'query-string';
import clsx from "clsx";


export const ENDPOINT = '//localhost:3001/'


class ApiCall {
    private readonly domain: string;

    constructor(domain: string) {
        this.domain = domain
    }

    async perform(url: string, data?: string | null, config?: any | null) {
        const request = await fetch(`${this.domain}${url}`, {
            ...config,
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        return await request.json();
    }

    async get(path: string, search_params?: Record<any, any>) {
        return await this.perform(clsx(path, search_params && '?' + qs.stringify(search_params)))
    }

    async post(path: string, payload: any) {
        return await this.perform(path, payload, {
            method: 'POST'
        })
    }

    async put(path: string, payload: any) {
        return await this.perform(path, payload, {
            method: 'PUT'
        })
    }

    async delete(path: string) {
        return await this.perform(path, null, {
            method: 'DELETE'
        })
    }
}

export default new ApiCall(ENDPOINT)