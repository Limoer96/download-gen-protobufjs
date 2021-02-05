export declare const tempFileName: string;
export interface IConfig {
    url: string;
    root?: string;
    output?: string;
    sourcePath?: string;
    clientWrapper?: {
        name?: string;
        path?: string;
    };
}
export declare const clientFileName = "clients.ts";
export declare const configFilePath: string;
export declare const clientFileTargetPath: string;
export declare const configTemplate: IConfig;
export declare const INIT_CONFIG: IConfig;
