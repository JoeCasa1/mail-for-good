import { json } from 'body-parser';
const parseJson = json();
const cookieParser = require('cookie-parser')();

// Campaign controllers
import getCampaigns from '../controllers/campaign/get-campaigns';
import createCampaign from '../controllers/campaign/create-campaign';
import deleteCampaigns from '../controllers/campaign/delete-campaigns';
import exportSentUnsentCSV from '../controllers/campaign/export-sent-unsent-csv';
import stopCampaignSending from '../controllers/campaign/stop-campaign-sending';
import sendCampaign from '../controllers/campaign/send-campaign';
import sendTestEmail from '../controllers/campaign/email/amazon-ses/send-test';

// Middleware
import { apiIsAuth } from './middleware/auth';
import { writeAccess, readAccess } from './middleware/acl';

// Permission
import campaignPermission from '../controllers/permissions/acl-lib/acl-campaign-permissions';

// Higher order functions decorating with the permission type
const writeCampaignAccess = (req, res, next) => writeAccess(req, res, next, campaignPermission);
const readCampaignAccess = (req, res, next) => readAccess(req, res, next, campaignPermission);

export default function(app, io, redis) {
  // Get a list of all campaigns
  app.get('/api/campaign', apiIsAuth, cookieParser, readCampaignAccess, (req, res) => {
    getCampaigns(req, res);
  });
  // Export subscribers that emails were not sent/sent to during a campaign
  app.get('/api/campaign/subscribers/csv', apiIsAuth, cookieParser, readCampaignAccess, (req, res) => {
    exportSentUnsentCSV(req, res);
  });

  // Post new campaign
  app.post('/api/campaign', apiIsAuth, parseJson, cookieParser, writeCampaignAccess, (req, res) => {
    createCampaign(req, res, io);
  });
  // Delete campaign(s)
  app.delete('/api/campaign', apiIsAuth, parseJson, cookieParser, writeCampaignAccess, (req, res) => {
    deleteCampaigns(req, res);
  });

  /* Send */
  // Post to send campaign
  app.post('/api/send', apiIsAuth, parseJson, cookieParser, writeCampaignAccess, (req, res) => {
    sendCampaign(req, res, io, redis);
  });
  // Stop sending a campaign
  app.post('/api/stop', apiIsAuth, parseJson, cookieParser, writeCampaignAccess, (req, res) => {
    stopCampaignSending(req, res, redis);
  });
  // Post to send a test email
  app.post('/api/test', apiIsAuth, parseJson, cookieParser, writeCampaignAccess, (req, res) => {
    sendTestEmail(req, res);
  });
};
