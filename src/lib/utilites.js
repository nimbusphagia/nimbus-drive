export function buildTree(folders, parentId = null) {
  return folders
    .filter(f => f.parentId === parentId)
    .map(f => ({
      ...f,
      children: buildTree(folders, f.id)
    }));
}
export function getBaseUrl(req) {
  const protocol =
    req.headers["x-forwarded-proto"] ?? req.protocol;

  const host = req.headers["x-forwarded-host"] ?? req.headers.host;

  return `${protocol}://${host}`;
}

