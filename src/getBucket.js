export const getBucket = (name, options = {}) => {
  const bucket = new FRecord(name);
  options.addEncodedSearch && bucket.addEncodedSearch(options.addEncodedSearch)
  typeof options.securityChecks === 'boolean' && bucket.setSecurityChecks(options.securityChecks)
  bucket.search()
  return bucket.toJSON()
}