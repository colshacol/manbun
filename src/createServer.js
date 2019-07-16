const PageComponent = require('ds.base/PageComponent')

const verifyIndexRoute = (serverName, routes) => {
  const hasIndexRoute = routes.some(([routePath]) => {
    return routePath === '/'
  })

  if (!hasIndexRoute) throw Error(`${serverName}.routes has no "/" route.`)
}

const boundHandler = (routeHandler) => {
  return function (attributes, variables) {
    return routeHandler(this, attributes, variables)
  }
}

const applyRoute = (final, [routePath, routeHandler]) => {
  final[routePath] = boundHandler(routeHandler)
  return final
}

export const createServer = (serverName) => {
  const withRoutes = (routes) => {
    verifyIndexRoute(serverName, routes)
    const serverConfig = routes.reduce(applyRoute, { type: serverName })
    return PageComponent.create(serverConfig)
  }

  return {
    withRoutes
  }
}