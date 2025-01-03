require("dotenv").config({ path: `.env.deploy` });

const {
  DEPLOY_HOST,
  REPO_HOST,
  DEPLOY_USER,
  DEPLOY_PATH,
  DEPLOY_REF = "origin/master",
} = process.env;

module.exports = {
  apps: [
    {
      name: "frontend",
      script: "./build/index.html",
    },
  ],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: REPO_HOST,
      path: DEPLOY_PATH,
      "post-deploy": `cd frontend && npm i && npm run build`,
    },
  },
};
