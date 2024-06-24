/*
browserBaseURL should be specified without trailing slash ("/") eq. http://example.com/web-app
backendAPIUrl should be specified with trailing slash ("/") eq. http://example.com/api/
 */

const settings = {
  browserBaseURL: 'http://127.0.0.1:8081',
  backendAPIUrl: 'http://127.0.0.1:8091/take-1.0-SNAPSHOT/api/',
};

module.exports = { settings };
