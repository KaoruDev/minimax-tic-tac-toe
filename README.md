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

## Context
* I got a lot of help from this [blog post](https://www.neverstopbuilding.com/blog/minimax) about the ideal algorithm.
* I choose implementing this solution with a `React App` to brush up on my front-end skills and improve my JavaScript.
* AWS Resources are managed by [Pulumi](pulumi.com)


## Future Improvements

* Add React Component tests
* Add a CI to automatically upload new versions.
* Allow for rollbacks by separating versions by directories and having the `index.html` to the current versions.
