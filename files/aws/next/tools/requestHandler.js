
const NextServer = require("next/dist/server/next-server").default;
const path = require("path");

const reqResMapper = require("./compatLayer");

const serverConfig = {
  dir: path.join(process.cwd()),
  dev: false,
  conf: JSON.parse('{"env":{},"webpackDevMiddleware":null,"eslint":{"ignoreDuringBuilds":false},"typescript":{"ignoreBuildErrors":false,"tsconfigPath":"tsconfig.json"},"distDir":".next","cleanDistDir":true,"assetPrefix":"","configOrigin":"next.config.js","useFileSystemPublicRoutes":true,"generateEtags":true,"pageExtensions":["tsx","ts","jsx","js"],"target":"server","poweredByHeader":true,"compress":false,"analyticsId":"","images":{"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":[],"disableStaticImages":false,"minimumCacheTTL":60,"formats":["image/webp"]},"devIndicators":{"buildActivity":true,"buildActivityPosition":"bottom-right"},"onDemandEntries":{"maxInactiveAge":15000,"pagesBufferLength":2},"amp":{"canonicalBase":""},"basePath":"","sassOptions":{},"trailingSlash":false,"i18n":null,"productionBrowserSourceMaps":false,"optimizeFonts":true,"excludeDefaultMomentLocales":true,"serverRuntimeConfig":{},"publicRuntimeConfig":{},"reactStrictMode":true,"httpAgentOptions":{"keepAlive":true},"outputFileTracing":true,"staticPageGenerationTimeout":60,"swcMinify":false,"experimental":{"cpus":15,"sharedPool":true,"plugins":false,"profiling":false,"isrFlushToDisk":true,"workerThreads":false,"pageEnv":false,"optimizeImages":false,"optimizeCss":false,"scrollRestoration":false,"externalDir":false,"reactRoot":false,"disableOptimizedLoading":false,"gzipSize":true,"swcFileReading":true,"craCompat":false,"esmExternals":true,"isrMemoryCacheSize":52428800,"concurrentFeatures":false,"serverComponents":false,"fullySpecified":false,"outputFileTracingRoot":"","outputStandalone":true},"configFileName":"next.config.js"}'),
};
const nextServer = new NextServer(serverConfig);

const handler = nextServer.getRequestHandler();

module.exports.render = async (event) => {
  const { req, res, responsePromise } = reqResMapper(event);
  handler(req, res);
  return responsePromise.then((r) => {
    r.headers = Object.entries(r.multiValueHeaders).reduce(
      (prevValue, [key, value]) => {
        prevValue[key] = value.join(",");
        return prevValue;
      },
      {}
    );
    // delete r.headers["cache-control"];
    delete r.multiValueHeaders;
    return r;
  }).catch((err) => {
      console.error(err);
      res.statusCode = 500;
      res.end("internal server error");
    });;
};