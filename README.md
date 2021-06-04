# Unbeatable Tic Tac Toe

## Playing Game
Head over to [https://unbeatable-tic-tac-toe.kohashigawa.com/](https://unbeatable-tic-tac-toe.kohashigawa.com/)

## Running Locally

### With Docker

Steps:
1. [Install Docker](https://www.docker.com/products/docker-desktop) and make sure it's running (`docker images` should return a non-error).
2. `bin/docker_run.sh`
3. Open [localhost:3000](localhost:3000)

```
bin/docker_run.sh
```

### Host
Requirements:
* `nodejs ~ 16.2.0` (Recommended package manager: [asdf](https://github.com/asdf-vm/asdf-nodejs))

Steps:
1. Clone this repostiory: `git@github.com:KaoruDev/minimax-tic-tac-toe.git`
2. `cd minimax-tic-tac-toe/tic_tac_toe`
3. `npm install`
4. `npm start`
5. Open [localhost:3000](localhost:3000)

## Running tests
1. `cd tic_tac_toe`
2. `npm test` - Spins up a test server that will automatically run tests when files are changed.

## Deploying Web App
### Dependencies
* AWS Credentials 
* [Pulumi](pulumi.com) Credentials
* [jq](https://stedolan.github.io/jq/)

### Steps
1. Setup AWS Credentials
2. `bin/deploy_latest.sh`

## Deploying Infrastructure
### Dependencies
* AWS Credentials
* [Pulumi](pulumi.com) Credentials

### Steps
1. `cd pulumi/`
2. `pulumi up`

## Context
* I got a lot of help from this [blog post](https://www.neverstopbuilding.com/blog/minimax) to implement the minimax
  algorithm.
* I'm not a front-end specialist, but I choose to implement this solution with a `React App` because I felt it would
  be the easiest way to render a board, provide a good UX and be easily deployable to the Cloud. I would have liked to
  have used TypeScript for the React components. Alas, refamiliarizing myself with React, Redux AND improving my 
  TypeScript lingo seemed too daughting.
* AWS Resources are managed by [Pulumi](pulumi.com) with a TypeScript template. I find Node's programming model to align
  well with AWS's API paradigms and behavior.


## Future Improvements

* Add React Component tests
* Add Pulumi tests
* Make the site responsive so it can be played on mobile devices.
* Add a CI to automatically upload new versions.
* Allow for rollbacks by creating directories based on the sha value of HEAD and have the `index.html` 
  reference script and styles from a specific version.
