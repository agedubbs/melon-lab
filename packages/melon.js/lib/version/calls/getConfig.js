// @flow
import addressBook from '@melonproject/smart-contracts/addressBook.json';
import exchangeInfo from '@melonproject/smart-contracts/utils/info/exchangeInfo';

import getNativeAssetSymbol from './getNativeAssetSymbol';
import getNetwork from '../../utils/environment/getNetwork';
import getQuoteAssetSymbol from '../../pricefeeds/calls/getQuoteAssetSymbol';
import getWhiteListedAssets from '../../assets/utils/getWhiteListedAssets';

import type { Address } from '../../assets/schemas/Address';
import type { TokenSymbol } from '../../assets/schemas/TokenSymbol';

/**
 * Asset config
 */
export type AssetConfig = {
  address: Address,
  decimal: number,
  name: string,
  symbol: TokenSymbol,
  url: string,
};

/**
 * Config retrieved from the version
 */
export type Config = {
  assets: Array<AssetConfig>,
  onlyManagerCompetitionAddress: Address,
  noComplianceCompetitionAddress: Address,
  competitionComplianceAddress: Address,
  matchingMarketAddress: Address,
  matchingMarketAdapter: Address,
  zeroExV1Address: Address,
  zeroExV1AdapterAddress: Address,
  nativeAssetSymbol: TokenSymbol,
  canonicalPriceFeedAddress: Address,
  stakingPriceFeedAddress: Address,
  quoteAssetSymbol: TokenSymbol,
  rankingAddress: Address,
  riskManagementAddress: Address,
  versionAddress: Address,
  governanceAddress: Address,
};

let config: Config;

/**
 * Get config from deployed version contract
 */
const getConfig = async (environment, track = "kovan-demo"): Promise<Config> => {
  if (config) return config;

  const network = await getNetwork(environment);

  let mode;
  if (track === "kovan-demo") mode = "kovan"
  else if (track === "kovan-competition") mode = "kovanCompetition"
  else if (track === "live") mode = "live"

  config = {
    onlyManagerCompetitionAddress: addressBook[mode].OnlyManagerCompetition,
    competitionComplianceAddress: addressBook[mode].CompetitionCompliance,
    matchingMarketAddress: addressBook[mode].MatchingMarket,
    matchingMarketAdapter: addressBook[mode].MatchingMarketAdapter,
    zeroExV1Address: addressBook[mode].ZeroExExchange,
    zeroExV1AdapterAddress: addressBook[mode].ZeroExV1Adapter,
    canonicalPriceFeedAddress: addressBook[mode].CanonicalPriceFeed,
    rankingAddress: addressBook[mode].FundRanking,
    riskManagementAddress: addressBook[mode].NoRiskMgmt,
    versionAddress: addressBook[mode].Version,
    governanceAddress: addressBook[mode].Governance,
    olympiadAddress: addressBook[mode].Competition
  }

  // HACK: Define config first so that inside these next async functions,
  // getConfig() already returns the addresses to avoid an infinite loop
  config.assets = await getWhiteListedAssets(environment, network);
  config.nativeAssetSymbol = await getNativeAssetSymbol(environment);
  config.quoteAssetSymbol = await getQuoteAssetSymbol(environment);
  config.melonAssetSymbol = network === 'kovan' ? 'MLN-T' : 'MLN';

  return config;
};

export default getConfig;
