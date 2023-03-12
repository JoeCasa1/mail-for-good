export const sessionSecret = process.env.SESSION_SECRET || 'TestingTesting';
export const mongo = process.env.MONGO_DB;
export const email = {
  amazon: {
    accessKeyId: process.env.AMAZON_ACCESS_KEY_ID || null,
    secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY || null
  }
};
export const smtpServer = {
  port: process.env.SMTP_TEST_PORT || '2025',
  host: process.env.SMTP_TEST_HOST || '127.0.0.1'
};
export const google = {
  consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK || 'http://localhost:8080/auth/google/callback'
};
