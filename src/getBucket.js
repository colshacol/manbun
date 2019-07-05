export const getBucket = (name) => {
  const bucket = new FRecord(name);
  bucket.search()
  return bucket.toJSON()
}