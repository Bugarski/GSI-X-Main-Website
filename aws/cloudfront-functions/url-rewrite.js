/**
 * CloudFront Function — URL Rewrite for SPA
 * 
 * This function rewrites all non-file requests to /index.html
 * so React Router can handle client-side routing.
 * 
 * Deploy as a CloudFront Function on the Viewer Request event.
 */
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // If the URI has a file extension, serve it as-is
  if (uri.includes('.')) {
    return request;
  }

  // Rewrite all other paths to /index.html for SPA routing
  request.uri = '/index.html';
  return request;
}
