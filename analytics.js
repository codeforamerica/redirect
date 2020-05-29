const Mixpanel = require('mixpanel');

module.exports = {
  trackRedirect(req) {
    if (!process.env.MIXPANEL_TOKEN) {
      return;
    }
    const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN);

    const shortLink = req.params.wanted;

    mixpanel.track('redirect', {
      short_link: shortLink,
      referrer: req.headers['referer'] || '',
      user_agent: req.headers['user-agent'] || '',
      utm_campaign: req.query['utm_campaign'] || '',
      utm_medium: req.query['utm_medium'] || '',
      utm_source: req.query['utm_source'] || '',
    });
  }
};
