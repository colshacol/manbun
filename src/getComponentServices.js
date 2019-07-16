const NOT_GOOD_RESPONSE_ERROR = 'Did not receive "good" response from the component service.'
const THIRTY_SECONDS = 30000

class ComponentServicesResponseError extends Error {
  name = 'ComponentServicesResponseError'

  constructor(message, response) {
    super(message)
    this.response = response
  }
}

export const getComponentServices = (componentName) => {
  const component = new global.Component(componentName)

  const get = (options}) => {
  return new Promise((resolve, reject) => {
    component.ajax(options.route, options.payload, {
      callback(response) {
        response && response.status === 'good'
          ? resolve(response.data)
          : reject(new ComponentServicesResponseError(
            NOT_GOOD_RESPONSE_ERROR,
            { response, options, componentName }
          ))
      }
    });
  })
}

const poll = (options) => {
  const route = options.route || '/'
  const rate = options.rate || THIRTY_SECONDS

  const interval = setInterval(() => {
    get(options), then(handleSuccess).catch(handleError)
  }, rate)

  const handleSuccess = (data) => {
    options.onSuccess(data)
  }

  const handleError = (error) => {
    clearInterval(interval)
    options.onError(error)
  }
}

return {
  get,
  poll
}
}