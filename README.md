# SFU
SFU 2020 Hackathon 

## Installations

### Local

First, you need:

- node and npm

- a web browser

- postgres (remember the password for later)

```bash
cd <the folder with this stuff>
cp .env.template .env
```

Edit the .env file and place your password for the postgres database where it tells you to.

```bash
npm i
npm run dev
```

You should see the database test result success.

Then open <http://localhost:3000> in your browser.
