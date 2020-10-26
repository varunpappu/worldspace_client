import axios, { Method } from 'axios';

class Executor {
    static async makeRequest(options: Options) {
        try {
            const response = await axios(options);
            return response;
        } catch (err) {
            return err.response;
        }
    }
}

export class HttpProxy {
    static async get(url: string, headers = {}): Promise<any> {
        const options: Options = {
            url,
            json: true,
            method: 'GET',
            headers,
        };
        const response = await Executor.makeRequest(options);
        return response;
    }
}

interface Options {
    url: string
    json: boolean
    method: Method
    headers: object
}