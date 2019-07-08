const addEncodedSearch = (bucket, options) => {
  if (options.addEncodedSearch) {
    bucket.addEncodedSearch(options.addEncodedSearch)
  }
}

const securityChecks = (bucket, options) => {
  if (typeof options.securityChecks === 'boolean') {
    bucket.setSecurityChecks(options.securityChecks)
  }
}

export const getBucket = (name, options = {}) => {
  const bucket = new FRecord(name);
  addEncodedSearch(bucket, options)
  securityChecks(bucket, options)
  bucket.search()
  return bucket.toJSON()
}