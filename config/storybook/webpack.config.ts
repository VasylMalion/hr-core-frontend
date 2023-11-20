import webpack, { RuleSetRule } from 'webpack'
import path from 'path'

import { buildCssLoader } from '../build/loaders/buildCssLoader'
import { BuildPaths } from '../build/types/config'

export default ({ config }: { config: webpack.Configuration }) => {
  const paths: BuildPaths = {
    build: '',
    html: '',
    entry: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  }
  
  // Ensure the existence of config.resolve.fallback and initialize it if undefined
  if (!config.resolve?.fallback) {
    config.resolve = {
      ...config.resolve,
      fallback: {},
    };
  }

  // Add fallbacks for missing Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    http: require.resolve('stream-http'),
    https: require.resolve('https-browserify'),
    zlib: require.resolve('browserify-zlib'),
    timers: require.resolve('timers-browserify'),
  };

  config.resolve?.modules?.push(paths.src)
  config.resolve?.extensions?.push('.ts', '.tsx')

  // eslint-disable-next-line no-param-reassign
  config.module!.rules = config.module!.rules!.map((rule: any) => {
    if (/svg/.test(rule.test as string)) {
      return { ...rule, exclude: /\.svg$/i }
    }

    return rule
  })

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  })
  config.module?.rules?.push(buildCssLoader(true))

  config.resolve?.modules?.push(path.resolve(__dirname, 'src'))

  return config
}
