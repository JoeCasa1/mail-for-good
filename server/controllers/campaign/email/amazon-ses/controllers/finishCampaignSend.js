import { campaign } from '../../../../../models';

/**
 * @description Change the campaign status on finishing a campaign send
 * @param {boolean} cancelCampaignSend - Flag for whether or not this campaign was cancelled
 * @param {object} campaignInfo - Information about this campaign
 */

export default (cancelCampaignSend, campaignInfo) => {
  const status = cancelCampaignSend ? 'interrupted' : 'done';
  campaign.update({
    status
  }, {
    where: {
      id: campaignInfo.campaignId
    }
  });
};
