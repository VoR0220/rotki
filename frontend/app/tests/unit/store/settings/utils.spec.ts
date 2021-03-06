import {
  TIMEFRAME_SETTING,
  DEFI_SETUP_DONE,
  TIMEFRAME_ALL,
  TIMEFRAME_REMEMBER,
  LAST_KNOWN_TIMEFRAME
} from '@/store/settings/consts';
import { loadFrontendSettings } from '@/store/settings/utils';

describe('settings:utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('restore nothing if no valid properties are found', async () => {
    expect.assertions(1);
    const commit = jest.fn();
    loadFrontendSettings(commit, JSON.stringify({ random: 1 }));
    expect(commit).toHaveBeenCalledTimes(0);
  });

  test('restore nothing is the loaded value is not a valid json', async () => {
    expect.assertions(1);
    const commit = jest.fn();
    loadFrontendSettings(commit, 'dasda');
    expect(commit).toHaveBeenCalledTimes(0);
  });

  test('restore nothing is the loaded value has an unexpected type', async () => {
    expect.assertions(1);
    const commit = jest.fn();
    loadFrontendSettings(commit, JSON.stringify({ [DEFI_SETUP_DONE]: 1 }));
    expect(commit).toHaveBeenCalledTimes(0);
  });

  test('restore valid properties', async () => {
    expect.assertions(1);
    const commit = jest.fn();
    loadFrontendSettings(commit, JSON.stringify({ [DEFI_SETUP_DONE]: true }));
    expect(commit).toHaveBeenCalledWith(
      'settings/restore',
      {
        [TIMEFRAME_SETTING]: TIMEFRAME_REMEMBER,
        [DEFI_SETUP_DONE]: true,
        [LAST_KNOWN_TIMEFRAME]: TIMEFRAME_ALL
      },
      { root: true }
    );
  });
});
