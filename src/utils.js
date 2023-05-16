const delay = 2 * 1000;

// dummy API can be used: https://status-codes.glitch.me/status/400
export function fetchRetry(url, params = {}, MAX_ATTEMPTS = 3) {
  // returns promise
  // sends request to url, if fulfilled then resolve(result)
  // if failed, then retry sendRequest(url, params, attempt-1)

  return new Promise(async (res, rej) => {
    console.group("fetchRetry " + url);
    params.extraData = { resolve: res, reject: rej };
    await retry(url, params);
    console.groupEnd();
  });

  async function retry(url, params = {}, attempt = 1) {
    const { resolve, reject } = params.extraData;
    const date = new Date();
    console.log(
      `sending request.. attempt ${attempt} time ${date.toLocaleTimeString()}`
    );
    try {
      const res = await fetch(url, params);
      if (!res.ok) throw new Error("Not 2xx response");
      const data = await res.json();
      console.log(`fulfilled in ${attempt} attempt`);
      resolve(data);
      return data;
    } catch (err) {
      if (attempt >= MAX_ATTEMPTS) {
        reject("max attempts exhausted");
        return;
      }
      // wait for delayMs & then again sendRequest (one more attempt)
      // hack: change url when final attempt (let the poor guy pass)
      // url = attempt + 1 === MAX_ATTEMPTS ? "https://jsonplaceholder.typicode.com/posts/1" : url;
      setTimeout(() => retry(url, params, attempt + 1), delay);
    }
  }
}

export const getId = (() => {
  let id = 0
  return () => ++id
})()

export function createItem(name) {
  return {
    id: getId(),
    name,
    isSelected: false,
  }
}