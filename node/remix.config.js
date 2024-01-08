/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    v2_routeConvention: true
  },
  ignoredRouteFiles: ['**/.*'],
  serverBuildPath: 'server/build/index.js'
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
}
