export default (fn, millis = 0) => {
  let timer
  let running

  return async (...args) => new Promise(resolve => {
    if (!running) {
      clearTimeout(timer);
    
      timer = setTimeout(async () => {
        running = true
        
        resolve(await fn.apply(this, args))
        
        running = false
      }, millis)
    } else {
      resolve()
    }    
  });
}
