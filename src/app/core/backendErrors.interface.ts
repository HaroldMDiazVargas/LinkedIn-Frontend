// Put this on shared/ 

export interface BackendErrorInterface {
    path: string;
    error: string;
    statusCode: number;
    method: string;
    timeStamp: Date
}