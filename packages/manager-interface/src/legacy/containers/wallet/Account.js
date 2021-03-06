import { connect } from 'react-redux';

import { actions } from '../../actions/wallet';
import { actions as routeActions } from '../../actions/routes';
import Account from '../../components/pages/wallet/Account';

const mapStateToProps = state => ({
  currentAddress: state.ethereum.account,
  associatedFund: state.app.usersFund,
  networkId: state.ethereum.network,
  isCompetition: state.app.isCompetition,
});

const mapDispatchToProps = dispatch => ({
  downloadJSON: () => dispatch(actions.downloadJSON()),
  deleteWallet: () => dispatch(actions.deleteWallet()),
  gotoSetup: () => dispatch(routeActions.setup()),
  goToFund: (fundAddress) => dispatch(routeActions.fund(fundAddress)),
  gotoImportJSON: () => dispatch(routeActions.walletImport()),
  gotoAccountGenerate: () => dispatch(routeActions.walletGenerate()),
  gotoAccountRestore: () => dispatch(routeActions.walletRestore()),
});

const AccountRedux = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Account);

export default AccountRedux;
