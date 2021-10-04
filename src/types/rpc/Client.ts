import axios from 'axios';
import fs from 'fs';
import { Agent } from 'https';
import { Response } from './Response';

export type Protocol = 'https' | 'http';

export interface ClientOptions {
    protocol: Protocol;
    host: string;
    port: number;
    caCertPath: string | boolean;
    certPath: string;
    keyPath: string;
}

export class Client {
    public readonly options: ClientOptions;
    public readonly agent: Agent;

    public constructor(options: ClientOptions) {
        this.options = options;
        this.agent = new Agent({
            ...(typeof options.caCertPath !== 'boolean'
                ? { ca: fs.readFileSync(options.caCertPath) }
                : {}),
            cert: fs.readFileSync(options.certPath),
            key: fs.readFileSync(options.keyPath),
            rejectUnauthorized: options.host !== 'localhost',
        });
    }

    public getBaseURL(): string {
        return `${this.options.protocol}://${this.options.host}:${this.options.port}`;
    }

    public async request<T>(
        route: string,
        body: unknown
    ): Promise<Response<T>> {
        return (
            await axios.post<Response<T>>(
                `${this.getBaseURL()}/${route}`,
                body,
                {
                    httpsAgent: this.agent,
                }
            )
        ).data;
    }
}
