require("dotenv").config({ path: `.env.deploy` });

const {
  DEPLOY_HOST,
  REPO_HOST,
  DEPLOY_USER,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
  DEPLOY_PRIVATE_KEY,
} = process.env;

module.exports = {
  apps: [
    {
      name: "backend",
      script: "./dist/app.js",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_HOST,
      path: DEPLOY_PATH,
      "pre-deploy-local": `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH} ${DEPLOY_PRIVATE_KEY}`,
      "post-deploy": `cd backend && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production`,
    },
  },
};
