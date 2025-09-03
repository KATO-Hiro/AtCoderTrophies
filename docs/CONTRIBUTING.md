# Contribution Guide

## Environment

### Common

- [mise](https://github.com/jdx/mise)

### Backend

- [uv](https://github.com/astral-sh/uv) - 0.8.x
- [Python](https://www.python.org/) - v3.12.x (For Python runtime in Vercel)
- [FastAPI](https://fastapi.tiangolo.com) 0.116.x
- [GNU make](https://formulae.brew.sh/formula/make)

### Frontend

- [Node.js](https://nodejs.org) 20.x
- [Next.js](https://nextjs.org/) 12.3.x
- [React](https://reactjs.org/) 17.0.x
- [TypeScript](https://www.typescriptlang.org/) 5.0.x

### Editor and Infrastructure (Optional)

- [Visual Studio Code](https://code.visualstudio.com/)

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

## Local Run - Common

### Install mise

```terminal
// macOS and Linux
curl https://mise.run | sh
```

## Local Run - Backend

### Install uv

```terminal
# For backend
mise install uv@latest
```

### Run

```terminal
cd backend

make install

# Run server in local
make dev
```

Open localhost from your browser.

<http://localhost:8000/docs>

### Test with pytest

```terminal
make test
```

### Format

GitHub Action will check if the code base is formatted by `ruff`. Please make sure that your change is formatted before sending a pull request. You can format the code base like the following:

```terminal
make fmt

make lint
```

## Local Run - Frontend

### Install Node.js

```terminal
# For frontend
mise install node@20
```

### Install pnpm

```terminal
# Install pnpm via mise (recommended)
mise install pnpm@9.15.9
```

### Run

```terminal
cd frontend

pnpm install
pnpm dev
```

Open localhost from your browser.

<http://localhost:3000>
<http://localhost:3000/api/v1/atcoder?username=chokudai>

### Format and Lint

GitHub Action will check if the code base is formatted by `prettier`. Please make sure that your change is formatted before sending a pull request. You can format the code base like the following:

```terminal
pnpm lint:fix
```
