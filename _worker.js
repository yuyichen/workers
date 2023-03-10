
// addEventListener("fetch",  (event) => {
//   let url = new URL(event.request.url);
//   url.hostname = "source.unsplash.com";
//   let request = new Request(url, event.request);
  
//   const handleRequest = async (req) => {
//     const res = await fetch(request);
//     if (res.status === 302) {
//         return fetch(res.headers.get('location'));
//     }
//     return res
//   }
//   event.respondWith(handleRequest(request));
// });

// export default {
//   async fetch(request, env) {
//     let url = new URL(request.url);
//     if (url.pathname.startsWith('/')) {
//       url.hostname = 'exepmle.com'
//       let new_request = new Request(url, request);
//       return fetch(new_request);
//     }
//     return env.ASSETS.fetch(request);
//   },
// };

export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      switch (true) {
        case url.pathname.startsWith("/openai/"):
          url.hostname = "api.openai.com";
          url.pathname = url.pathname.substr(7);
          break;
        default:
          url.hostname = "source.unsplash.com";
      }
      let new_request = new Request(url, request);
      const res = await fetch(new_request);
      if (res.status === 302) {
        return fetch(res.headers.get('location'));
      }
      return res;
    }
    return env.ASSETS.fetch(request);
  },
};
