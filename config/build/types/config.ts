export enum BuildMode {
  PRODUCTION = 'production', 
  DEVELOPMENT = 'development',
}

export type BuildPaths = {
  entry: string
  build: string
  html: string
  src: string
}

export type BuildOptions = {
  mode:BuildMode
  paths: BuildPaths
  isDev: boolean
  port: number
}

export type BuildEnv = {
  mode: BuildMode
  port: number
}
