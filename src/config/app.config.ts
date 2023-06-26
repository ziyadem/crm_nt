declare interface AppConfigOptions{
    mode?:string
    name?:string
    host?:string
    port?:number
}

export const appConfig: AppConfigOptions = {
  mode: process.env.APP_MODE ?? 'development',
  name: process.env.APP_NAME ?? 'geteway',
  host: process.env.APP_HOST ?? '0.0.0.0',
  port: process.env.APP_PORT ? parseInt(process.env.APP_PORT,10) : 2003,
}
