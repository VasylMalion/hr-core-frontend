import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { RuleSetRule } from "webpack";
import { BuildOptions } from "./types/config";

export const buildLoaders = ({ isDev }: BuildOptions): Array<RuleSetRule> => {
  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            localIdentName: isDev
              ? "[local]__[hash:base64:8]"
              : "[hash:base64:8]",
          },
        },
      },
      'sass-loader',
    ],
  };

  // const JSONLoader = {
  //   test: /\.json$/,
  //   use: 'json-loader',
  // }

  const SVGLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  };


  const cssLoader =
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader', 'postcss-loader'],
  }

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const fileLoader = {
    test: /\.(png|jpe?g|gif|svg)$/i,
    use: 'file-loader',
  }

  return [tsLoader, SVGLoader, cssLoader, scssLoader, fileLoader];
};
