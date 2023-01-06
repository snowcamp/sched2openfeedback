# sched2openfeedback

Import data from [Sched](https://sched.com/) and export a JSON file in [OpenFeedback](https://openfeedback.io/) format.

## Usage

```sh
npm install
npm start
```

A file `openfeedback.json` will be created, to be imported in OpenFeedback.

You need to specify these 2 environment variables:
```
SCHED_URL=https://<you_event>.sched.com/
SCHED_RO_KEY=<your_sched_readonly_key>
```

`.env` files are supported.
