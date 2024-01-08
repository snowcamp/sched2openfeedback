# sched2openfeedback

Import data from [Sched](https://sched.com/) and export a JSON file in [OpenFeedback](https://openfeedback.io/) format.

## Snowcamp team guide

How to prepare for a new edition:

1. Set or update [Actions secrets](https://github.com/snowcamp/sched2openfeedback/settings/secrets/actions) (if needed)
  - `SCHED_KEY_RO`: read-only key for sched event. Can be found at https://snowcamp<year>.sched.com/editor/exports/api
  - `GITHUB_TOKEN`: a [GitHub PAT](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) with `repository` scope from someone with access to this repo

2. Update `SCHED_URL` and `BRANCH` in [`export.yml`](https://github.com/snowcamp/sched2openfeedback/blob/main/.github/workflows/export.yml)

3. Go to [export action](https://github.com/snowcamp/sched2openfeedback/actions/workflows/export.yml) and select **Run workflow** to update the data

4. You can now use the URL `https://raw.githubusercontent.com/snowcamp/sched2openfeedback/<BRANCH>/openfeedback.json` to import data in OpenFeedback.

## Development

If the script needs to be updated, you can run it locally. Clone the repo, then:

```sh
npm install
npm run build
npm start
```

A file `openfeedback.json` will be created, to be imported in OpenFeedback.

You need to specify these 2 environment variables, either in your shell or in a `.env` file at the root of the project:
```
SCHED_URL=https://<you_event>.sched.com/
SCHED_RO_KEY=<your_sched_readonly_key>
```

You can also use the `npm run build:watch` command to automatically rebuild the script when a file is changed.
