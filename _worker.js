
addEventListener("fetch",  (event) => {
  let url = new URL(event.request.url);
  url.hostname = "source.unsplash.com";
  let request = new Request(url, event.request);
  
  const handleRequest = async (req) => {
    const res = await fetch(request);
    if (res.status === 302) {
        return fetch(res.headers.get('location'));
    }
    return res
  }
  event.respondWith(handleRequest(request));
});
