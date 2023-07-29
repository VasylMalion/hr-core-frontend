import path from "path";
import { Configuration } from "webpack";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildMode, BuildPaths } from "./config/build/types/config";

const paths: BuildPaths = {
  entry: path.resolve(__dirname, "src", "index.tsx"),
  build: path.resolve(__dirname, "build"),
  html: path.resolve(__dirname, "public", "index.html"),
  src: path.resolve(__dirname, "src"),
};

export default (env: BuildEnv) => {
  const mode = env.mode || BuildMode.DEVELOPMENT;
  const isDev = mode === BuildMode.DEVELOPMENT;
  const PORT = env.port || 3000;

  const config: Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
  });

  return config;
}
