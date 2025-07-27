// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Mock environment variables for tests
process.env.YOUTUBE_API_KEY = 'test-youtube-api-key'
process.env.INSTAGRAM_CLIENT_ID = 'test-instagram-client-id'
process.env.INSTAGRAM_CLIENT_SECRET = 'test-instagram-client-secret'
process.env.INSTAGRAM_ACCESS_TOKEN = 'test-instagram-access-token'
process.env.TWITTER_BEARER_TOKEN = 'test-twitter-bearer-token'
process.env.TWITTER_API_KEY = 'test-twitter-api-key'
process.env.TWITTER_API_SECRET = 'test-twitter-api-secret'