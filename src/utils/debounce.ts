export default function debounce(func: any, wait: number = 100):any {
  let timeout: NodeJS.Timeout;
  return function(this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
