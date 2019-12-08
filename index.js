const github = require("@actions/github");
const core = require("@actions/core");
const graphql = require("@octokit/graphql");
const actions = require("@jestaubach/actions");

async function run() {
  const myToken = process.env.ACTION_TOKEN ? process.env.ACTION_TOKEN : core.getInput("action-token");
  const repo = process.env.REPO ? process.env.REPO : core.getInput("repo");
  const ref = process.env.REF ? process.env.REF : core.getInput("ref");
  const octokit = new github.GitHub(myToken);
  const context = github.context;
  
  console.log(
    `>> Action triggered by branch creation: ${JSON.stringify(ref)}\n`,
    `   << Take action on branch creation..`
  );
  await actions.githubProjects.markIssueMatchingBranchAsWIP(octokit, context, repo, ref);
}

run()
  .then(
    (response) => { console.log(`Finished running: ${response}`); },
    (error) => { 
      console.log(`#ERROR# ${error}`);
      process.exit(1); 
    }
  );
