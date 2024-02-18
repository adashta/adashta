export const isRelativeUrl = (urlString: string) => {
  const RgExp = new RegExp('^(?:[a-z]+:)?//', 'i');
  if (RgExp.test(urlString)) {
    return false;
  } else {
    return true;
  }
};
