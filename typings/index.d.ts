declare module NodeJS  {
    interface Global {
        app: any
        navigator : any
        window : any
        document : any
        $ : any
        documentRef : any
        globalConfig : any
        mongoose : any
    }
}
declare var app : {
    logger:any,
    config:any,
    services: {
        RequestService: {
            request: (requestParam: { url: string, paramObj?: object, method: string, bForm?: boolean }, requestHeader?: { userAgent?: string, contentType?: string, others?: any})=>Promise<any>
        }
    }
}
declare var require: NodeRequire;
declare var globalConfig : any
declare var mongoose : any