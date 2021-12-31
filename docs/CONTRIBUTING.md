# Contribution Guide

## Environment

### Editor and Infrastructure (Highly recommended)

- [Docker Desktop](https://www.docker.com/products/docker-desktop) 20+
- [Visual Studio Code](https://code.visualstudio.com/)
- [Visual Studio Code Remote - Containers](https://code.visualstudio.com/docs/remote/containers)

### Backend

- [FastAPI](https://fastapi.tiangolo.com) 0.70.x

### Frontend

- [Node.js](https://nodejs.org) 16.13.x
- [Next.js](https://nextjs.org/) 12.0.x
- [React](https://reactjs.org/) 17.0.x
- [TypeScript](https://www.typescriptlang.org/) 4.3.x

### Hosting

- [Vercel](https://vercel.com/)

### Third party API

- [AtCoder Problems API / Datasets](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md)

## Clone the repository

Paste the following commands at a Terminal prompt.

```termial
mkdir AtCoderTrophies
cd AtCoderTrophies
git clone git@github.com:KATO-Hiro/AtCoderTrophies.git
```

## Local Run - Backend

### Run

Run a local server in a container ([More details](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)).

1. Launch [VS Code](https://code.visualstudio.com/) on your PC.
2. Use Command Palette to run `Remote - Containers`.
   - Mac: `Cmd + Shift + P`
   - Windows: `Ctrl + Shift + P`
3. Run **Remote-Containers: Open Folder in Container...** from the Command Palette and select the `backend` folder.
4. VS Code will then start up both containers (`backend` and `frontend`), connect this window to service `backend`, and install extensions.

Open localhost from your browser.

<http://localhost:8000/docs>

### Test with pytest

```terminal
pytest . --vcr-record=none
```

### Format

GitHub Action will check if the code base is formatted by `black`. Please make sure that your change is formatted before sending a pull request. You can format the code base like the following:

```terminal
# Run Black
black .
```

## Local Run - Frontend

### Run

Run a local server in a container ([More details](https://code.visualstudio.com/remote/advancedcontainers/connect-multiple-containers)).

1. Launch [VS Code](https://code.visualstudio.com/) on your PC.
  If you are already running the services, start up a new window using **File > New Window**.
2. Use Command Palette to run `Remote - Containers`.
   - Mac: `Cmd + Shift + P`
   - Windows: `Ctrl + Shift + P`
3. Run **Remote-Containers: Open Folder in Container...** from the Command Palette and select the `frontend` folder.
4. VS Code will then start up both containers (`frontend` and `backend`), connect this window to service `frontend`, and install extensions.
  If the services are already running, VS Code will then connect to `frontend` and install extensions.

You can now interact with both containers at once from separate windows.

Open localhost from your browser.

<http://localhost:3000>
<http://localhost:3000/api/v1/atcoder?username=chokudai>

### Format and Lint

GitHub Action will check if the code base is formatted by `prettier`. Please make sure that your change is formatted before sending a pull request. You can format the code base like the following:

```terminal
yarn lint:fix
```
