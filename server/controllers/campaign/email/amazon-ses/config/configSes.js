/**
 * @description Converts {{variables}} in the email body to their equivalent in the db
 * @param {object} task - The email to create
 * @param {object} campaignInfo - Information about this campaign
 * @return {string} HTML with {{variables}} replaced by what they represent. E.g., {{cat}} may become 'Garfield'
 */

import { SES } from 'aws-sdk';

export default (accessKey, secretKey, region) => {
  const isProductionTestMode = process.env.TEST_PRODUCTION === 'true';
  const isDevMode = process.env.NODE_ENV === 'development' || isProductionTestMode;

  const ses = (isDevMode || isProductionTestMode)
    ? new SES({  // Dev mode
        apiVersion: '2010-12-01',
        // convertResponseTypes: false,
        accessKeyId: accessKey,
        secretAccessKey:
        secretKey,
        region,
        endpoint: 'http://localhost:9999'
      })
    : new SES({ // Prod mode
        apiVersion: '2010-12-01',
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
        region
      });

  return ses;
};
