// credit: https://gist.github.com/ca0v/73a31f57b397606c9813472f7493a940?permalink_comment_id=3547200#gistcomment-3547200
/* eslint-disable @typescript-eslint/no-explicit-any */
export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor = 500,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      result = callback(...args);
    }, waitFor);
    return result;
  };
};
