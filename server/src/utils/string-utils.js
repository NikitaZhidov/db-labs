export const isUndefinedOrNullOrWhiteSpace = (value) => {
  if (typeof value === 'string') {
    if (value.trim() === '') {
      return true;
    }
  }

  return value == null || value == undefined;
};
