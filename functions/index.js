const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://us13.campaign-archive.com/feed?u=a4da16d11b719a3278222750c&id=f39221935e',
      'https://theroutingcompany.com'
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest((request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
