import kindOf from 'kind-of'

const console = global.console
const objectTypes = ['object', 'array']

const stringifyClean = (target) => {
  return JSON.stringify(target, null, 2)
}

const prepareMessages = (messages) => {
  return messages.map(message => {
    const type = kindOf(message)

    if (type === "undefined") {
      return 'undefined'
    }

    if (type === "string") {
      return message
    }

    if (objectTypes.includes(type)) {
      return stringifyClean(message)
    }

    if (type === 'map') {
      return stringifyClean(Array.from(message))
    }

    try {
      return JSON.stringify(message)
    } catch (error) {
      return message
    }
  })
}

export const createLogger = (_identifier) => {
  const _prefix = `[ ${_identifier} ]`

  const log = (...messages) => {
    const prepared = prepareMessages(messages)
    const final = `${_prefix} ${prepared.join('\n')}`
    console.log(final)
    return final
  }

  return {
    _identifier,
    _prefix,
    log
  }
}
