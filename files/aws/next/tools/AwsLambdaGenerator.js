const path = require("path");
const fs = require("fs");
const { ensureDirSync, outputFileSync } = require("fs-extra");

const DefaultOptions = {
  distDir: ".next/aws",
};

// Plugin Webpack
module.exports = class AwsLambdaGenerator {
  constructor(nextConfig, options) {
    this.nextConfig = nextConfig;
    this.options = Object.assign(DefaultOptions, options);
  }

  apply(compiler) {
    const { context } = compiler;
    const {
      nextConfig: { isServer, dev, config },
      options,
    } = this;

    compiler.hooks.done.tap("AwsLambda", () => {
      if (!isServer || dev) return;
      const outDir = path.join(context, options.distDir);
      ensureDirSync(outDir);
      createRequestHandlerFile(outDir, config);
    });
  }
};

const createRequestHandlerFile = (outDir, conf) => {
  conf.compress = false;
  // conf.experimental.outputStandalone = false;
  delete conf.configFile;

  const content = `
const reqResMapper = require("next-aws-lambda/lib/compatLayer");
const NextServer = require("next/dist/server/next-server").default;
const path = require("path");

const serverConfig = {
  dir: path.join(process.cwd()),
  dev: false,
  conf: JSON.parse('${JSON.stringify(conf)}'),
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
};`;

  const handlerPath = path.join(outDir, "requestHandler.js");
  outputFileSync(handlerPath, content);
};
