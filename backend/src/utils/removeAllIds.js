function removeAllIds(obj) {
  if (Array.isArray(obj)) {
    return obj.map(removeAllIds);
  } else if (obj !== null && typeof obj === 'object') {
    const newObj = {};
    for (const key in obj) {
      if (key !== '_id') {
        newObj[key] = removeAllIds(obj[key]);
      }
    }
    return newObj;
  }
  return obj;
}

module.exports = removeAllIds;