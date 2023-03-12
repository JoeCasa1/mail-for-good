import uaParser from 'ua-parser-js';
import { lookup } from 'geoip-lite';

import { campaignanalyticsopen as CampaignAnalyticsOpen } from '../../models';
import { campaignanalytics as CampaignAnalytics } from '../../models';

const trackingPixel = new Buffer('R0lGODlhAQABAPAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw', 'base64');

export default function(req, res) {
  CampaignAnalyticsOpen.findOne({
    where: {
      trackingId: req.query.trackingId,
      opened: false
    }
  }).then(foundCampaignAnalyticsOpen => {
    // only track the first open (updatedAt is set automatically)
    if (foundCampaignAnalyticsOpen) {
      foundCampaignAnalyticsOpen.opened = true;

      // Attempt to get ip
      const ipAddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      foundCampaignAnalyticsOpen.ipAddress = ipAddress;

      // Attempt ip geolocation using MaxMind db
      const geoLocation = lookup(ipAddress);
      if (geoLocation) {  // If the IP address was not found, the lookup returns null
        foundCampaignAnalyticsOpen.country = geoLocation.country;
        foundCampaignAnalyticsOpen.region = geoLocation.region;
        foundCampaignAnalyticsOpen.city = geoLocation.city;
      }

      // Parse headers
      const headers = uaParser(req.headers['user-agent']);
      foundCampaignAnalyticsOpen.browserName = headers.browser.name;
      foundCampaignAnalyticsOpen.deviceVendor = headers.device.vendor;
      foundCampaignAnalyticsOpen.deviceType = headers.device.type;
      foundCampaignAnalyticsOpen.operatingSystem = headers.os.name;

      foundCampaignAnalyticsOpen.save().then(result => {
        CampaignAnalytics.findById(foundCampaignAnalyticsOpen.campaignanalyticId).then(foundCampaignAnalytics => {
          foundCampaignAnalytics.increment('openCount').then(result => {
            console.log("saved");
          });
        });
      });
    }
  });

  res.writeHead(200, {
    'Content-Type': 'image/gif',
    'Content-Length': trackingPixel.length
  });
  res.end(trackingPixel);
};
