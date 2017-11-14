
function urlToBase64(url) {
  return new Promise((resolve, reject) => {
    request.get(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        resolve("data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64'));
      } else {
        reject(response);
      }
    });
  })
} 

// Map input data to an Array of Promises
let promises = input.map(element => {
  return urlToBase64(element.image)
    .then(base64 => {
      element.base64Data = base64;
      return element;
    })
});

// Wait for all Promises to complete
Promise.all(promises)
  .then(results => {
    // Handle results
  })
  .catch(e => {
    console.error(e);
  })
