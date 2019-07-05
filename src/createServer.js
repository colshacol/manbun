const PageComponent = require('ds.base/PageComponent')

import { invariant } from 'manbun/invariant'

const verifyIndexRoute = (serverName, routes) => {
  const hasIndexRoute = routes.some(([routePath]) => {
    return routePath === '/'
  })

  invariant(hasIndexRoute, `${serverName}.routes has no "/" route.`)
}

const boundHandler = (routeHandler) => {
  return function (attributes, variables) {
    return routeHandler(this, attributes, variables)
  }
}

const applyRoute = (final, [routePath, routeHandler]) => {
  console.log('APPLYING ROUTE: ' + routePath)
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