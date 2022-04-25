# example-deno-oak-blog-app

This is an example project to show how to make a clean architechture building a blog-platform-web-app-thing using Deno+Oak+Web.

## Setup

### VS Code

1. Install [VS Code](https://code.visualstudio.com/), [Git](https://git-scm.com/), [Deno](https://deno.land/) and [Deno VS Code extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno)

2. Open VS Code in repository root folder. For example: in terminal after `git clone ...` write `code example-deno-oak-blog-app`

3. Initialize Deno Workspace, by clicking `Ctrl+Shift+P` and then typing/selecting `Deno: Initialize Workspace Configuration`

4. Open terminal by pressing `Ctrl+J`

5. Run tests by typing `deno test --allow-net`

6. Run application by typing `deno run --allow-read --allow-net main.ts`

7. Run application in watch-mode by typing `deno run --watch --allow-read --allow-net main.ts`

## Things to be aware of

### Static files

Static file serving is implemented using Oak built-in send `Context.send`.
This is fragile and should be replaced by either a seperate static file server,
or a better Oak middleware.
