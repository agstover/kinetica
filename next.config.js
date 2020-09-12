require('dotenv').config()
const withOptimizedImages = require('next-optimized-images')

module.exports = withOptimizedImages({
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  }
})