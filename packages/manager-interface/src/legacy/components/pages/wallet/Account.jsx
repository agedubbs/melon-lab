import React from 'react';
import { Button, Card, Header } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import { tracks } from '@melonproject/melon.js';

const MyAccount = ({
  currentAddress,
  associatedFund,
  deleteWallet,
  gotoAccountGenerate,
  gotoAccountRestore,
  gotoImportJSON,
  gotoSetup,
  downloadJSON,
  networkId,
  isCompetition,
  goToFund
}) => (
  <div>
    <Card centered>
      <Card.Content>
        <Header as="h2">Your Wallet</Header>
        {currentAddress ? (
          <div>
            <p>
              Your ethereum address. Use this for white listing on{' '}
              <a href="https://ico.bitcoinsuisse.ch/" target="_blank">
                ico.bitcoinsuisse.ch
              </a>:
              <strong>
                <a
                  href={`https://${
                    networkId === '42' ? 'kovan.' : ''
                  }etherscan.io/address/${currentAddress}`}
                  target="_blank"
                >
                  {' '}
                  {currentAddress}{' '}
                </a>
              </strong>
            </p>
            {associatedFund ? (
              <p>
                Associated fund address:{' '}
                <strong>
                  <a
                    href={`https://${
                      networkId === '42' ? 'kovan.' : ''
                    }etherscan.io/address/${associatedFund}`}
                    target="_blank"
                  >
                    {associatedFund}
                  </a>
                </strong>
              </p>
            ) : null}

            <p>
              <strong>
                It is highly recommended to download a backup of your wallet.
                You can import this into{' '}
                <a href="https://mycrypto.com/" target="_blank">
                  MyCrypto.com
                </a>{' '}
                or Parity.
              </strong>
            </p>
            <Button
              basic
              color="black"
              style={{ width: '100%', marginBottom: '1em' }}
              onClick={downloadJSON}
            >
              Download wallet backup JSON
            </Button>
            <br />
            {!associatedFund ? (
              <p>
                <Button
                  basic
                  color="green"
                  style={{ width: '100%', marginBottom: '1em' }}
                  onClick={gotoSetup}
                >
                  Setup your fund
                </Button>
              </p>
            ) :           <p>
                <Button
                  basic
                  color="green"
                  style={{ width: '100%', marginBottom: '1em' }}
                  onClick={() =>
                      goToFund(associatedFund)
                    }
                >
                  Go to your fund
                </Button>
              </p>}
            <br />
            {!isCompetition ? (
              <div>
                <p>
                  <strong> [IMPORTANT] - Please read carefully</strong>{' '}
                </p>
                <p>
                  Careful, below actions have <strong> irreversible</strong>{' '}
                  effects. If you do not have a backup of the mnemonic phrase
                  that generated your current address,
                  <strong>
                    {' '}
                    you will never be able to access your current wallet again{' '}
                  </strong>{' '}
                  after performing one of the below actions.
                </p>
                <p>
                  If you do not wish to continue,{' '}
                  <Link to="/">
                    click here to go back to your fund&#39;s page
                  </Link>.
                </p>
                <br />
              </div>
            ) : null}
          </div>
        ) : (
          <div>
            <p>
              Before you can setup your fund, you need to import, restore or
              create a wallet:
            </p>
            <br />
          </div>
        )}

        <div>
          {!isCompetition ? (
            <p>
              <Button
                basic
                color={currentAddress ? 'red' : 'black'}
                style={{ width: '100%' }}
                onClick={gotoAccountGenerate}
              >
                Create a new wallet
              </Button>
            </p>
          ) : null}
          <p>
            <Button
              basic
              color={currentAddress ? 'red' : 'black'}
              style={{ width: '100%' }}
              onClick={gotoAccountRestore}
            >
              Restore from mnemonic
            </Button>
          </p>
          <p>
            <Button
              basic
              color={currentAddress ? 'red' : 'black'}
              style={{ width: '100%' }}
              onClick={gotoImportJSON}
            >
              Import wallet JSON
            </Button>
          </p>
          {currentAddress && !isCompetition ? (
            <p>
              <Button
                basic
                color={currentAddress ? 'red' : 'black'}
                style={{ width: '100%' }}
                onClick={deleteWallet}
              >
                Delete wallet
              </Button>
            </p>
          ) : null}
        </div>
      </Card.Content>
    </Card>
  </div>
);

export default MyAccount;
