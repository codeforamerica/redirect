const redis = require('redis');

const analyticsKey = function() {
  const now = (new Date());
  return now.toISOString().slice(0, 10);
};
const analyticsFromReq = function(req) {
  const shortLink = req.params.wanted;

  return [
    shortLink,
    `${shortLink}|referer|${req.headers['referer'] || ''}`,
    `${shortLink}|user_agent|${req.headers['user-agent'] || ''}`,
    `${shortLink}|utm_campaign|${req.query['utm_campaign'] || ''}`,
    `${shortLink}|utm_medium|${req.query['utm_medium'] || ''}`,
    `${shortLink}|utm_source|${req.query['utm_source'] || ''}`,
  ];
};

let client;
if (process.env.REDIS_URL) {
  client = redis.createClient(process.env.REDIS_URL);
  client.on('error', (err) => {
    console.log("Redis Error: " + err);
  });
}

module.exports = {
  trackRedirect(req) {
    const key = analyticsKey();
    const analytics = analyticsFromReq(req);

    console.log(JSON.stringify({ [key]: analytics }));

    if (process.env.REDIS_URL) {
      try {
        analytics.forEach(metric => client.hincrby(key, metric, 1));
      } catch (ex) {
        console.log("Analytics Error: " + ex);
      }
    }
  }
};
