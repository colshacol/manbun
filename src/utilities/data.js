export const allAreOfType = (target, type) => {
  return target.every(item => {
    return type === 'array'
      ? Array.isArray(item)
      : typeof item === type
  })
}