import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const esToolkitCompatAliases = [
  "get",
  "isPlainObject",
  "last",
  "maxBy",
  "minBy",
  "omit",
  "range",
  "sortBy",
  "sumBy",
  "throttle",
  "uniqBy",
].reduce((acc, name) => {
  acc[`es-toolkit/compat/${name}`] = path.join(
    __dirname,
    "node_modules/es-toolkit/compat",
    `${name}.js`
  );
  return acc;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      ...esToolkitCompatAliases,
    };

    return config;
  },
};

export default nextConfig;
