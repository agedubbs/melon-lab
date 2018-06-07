import { call, put, take, select, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';

import {
  getEnvironment,
  getWallet,
  isExternalSigner,
} from '@melonproject/melon.js';
import { actions as modalActions, types as modalTypes } from '../actions/modal';

function* signer(modalSentence, transaction, failureAction) {
  try {
    const environment = getEnvironment();
    yield put(modalActions.loading());

    if (!isExternalSigner(environment)) {
      yield put(modalActions.loading());

      // The wallet gets attached to the environment for only this transaction
      // for security reasons
      const privateKey = yield select(state => state.wallet.privateKey);
      const rawTransaction = yield call(transaction, {
        ...environment,
        dry: true,
        account: getWallet(privateKey),
      });

      yield put(
        modalActions.confirm(
          `${modalSentence} \n\n gasLimit: ${rawTransaction.gasLimit}`,
        ),
      );

      const action = yield take([modalTypes.CONFIRMED, modalTypes.CANCEL]);

      if (action.type === modalTypes.CONFIRMED) {
        yield call(transaction, {
          ...environment,
          dry: false,
          account: getWallet(privateKey),
        });
      }
    } else {
      yield call(transaction, { environment });
    }
  } catch (err) {
    if (err.name === 'EnsureError') {
      yield put(modalActions.error(err.message));
    } else {
      yield put(modalActions.error(err.message));
      console.error(err);
      console.log(JSON.stringify(err, null, 4));
    }
    yield put(failureAction(err));
  }
}

export default signer;
