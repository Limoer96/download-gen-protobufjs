import { IConfig } from '../const';
export declare function checkConfig(config: IConfig): {
    url: string;
    root?: string;
    output?: string;
    sourcePath?: string;
    clientWrapper?: {
        name?: string;
        path?: string;
    };
};
export declare function readConfig(): Promise<any>;
