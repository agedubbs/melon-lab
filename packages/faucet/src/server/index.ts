
require('dotenv-extended').config();

const compression = require('compression');
const nextApp = require('next');
const express = require('express');
const bodyParser = require('body-parser');
const Recaptcha = require('express-recaptcha').Recaptcha;

const web3 = require('web3');
const path = require('path');

const BigNumber = require('bignumber.js');

const { setup, getBalances, send, MLN, WETH } = require('./melon');

const { Storage } = require('./storage.ts');

const recaptcha = new Recaptcha(
  process.env.RECAPTCHA_SITE_KEY,
  process.env.RECAPTCHA_SECRET_KEY,
);

const dev = process.env.NODE_ENV !== 'production';
const app = nextApp({ dir: 'src', dev });

const DEFAULT_RPC_ENDPOINT = "https://kovan.melonport.com"

const err = (res, msg) => {
  res.status(400).json({ 'error': msg })
}

const ok = (res, msg) => {
  res.status(200).json({ 'msg': msg })
}

const storage = new Storage();

function parseList(str: string | undefined): string[] {
  return str == undefined || str == "" ? [] : str.split(',')
}

app.prepare().then(() => {
  const server = express();
  const handle = app.getRequestHandler();

  if (process.env.NODE_ENV === 'production') {
    // Add gzip compression.
    server.use(compression());
  }

  // Amounts to send from env variables
  const eth = web3.utils.toWei(process.env.ETH, "ether");
  const mln = new BigNumber(process.env.MLN);

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded());

  let whitelist: string[] = parseList(process.env.WHITELIST);
  let blacklist: string[] = parseList(process.env.BLACKLIST);

  console.log(`Whitelist: ${whitelist}`)
  console.log(`Blacklist: ${blacklist}`)

  server.get('/balance', async (req, res) => {
    const address = req.query.address;

    if (!web3.utils.isAddress(address)) {
      err(res, `${address} is not a valid address`)
    } else {
      try {
        const balances = await getBalances(address);
        res.json(balances)
      } catch (err) {
        err(res, `Failed to read balances: ${err}`)
      }
    }
  });
  
  server.get('/', async (req, res) => {
    res.recaptcha = recaptcha.render();

    const address = req.query.address || '';
    if (address != "") {
      res.address = address;

      if (!web3.utils.isAddress(address)) {
        res.error = `${address} is not a valid address`;
      } else {
        const balances = await getBalances(address);
        res.balances = balances;
      }
    }

    return handle(req, res);
  });

  server.post('/', async (req, res) => {
    const address = req.body.address || '';

    if (!web3.utils.isAddress(address)) {
      err(res, `${address} is not a valid address`)
      return
    }

    /*
    Disable ip manager

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(`IP: ${ip}`)
    console.log(req.headers)

    if (blacklist.indexOf(ip) != -1) {
      err(res, 'Your address has been blacklisted')
      return
    }

    if (whitelist.indexOf(ip) == -1) {
      const valid = await storage.isValid(ip);
      if (!valid) {
        err(res, `You have already requested more than 3 times in the last 24 hours.`)
        return
      }
    } else {
      console.log(`Whitelisted`)
    }
    */
    
    recaptcha.verify(req, async (error, data) => {
      if (error) {
        err(res, 'Captcha not valid')
      } else {
        try {
          // send 'mln' melon to the token symbol 'MLN'
          await send(address, mln, MLN);
          // send weth
          await send(address, mln, WETH);
          // send ether
          await send(address, eth);

          ok(res, 'Done')
        } catch (error) {
          err(res, 'Failed to send the transactions. Please try later.')
        }
      }
    });
  });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  try {
    setup(process.env.RPC_ENDPOINT || DEFAULT_RPC_ENDPOINT, process.env.WALLET, process.env.PASSWORD)
      .then(() => {
        server.listen(process.env.PORT);
      })
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
});
