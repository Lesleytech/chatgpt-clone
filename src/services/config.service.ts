export function getLocalConfig() {
  return {
    API_EP: process.env.REACT_APP_API_EP as string,
    HUMANLOOP_API_KEY: 'hl_sk_29f6888a76399730e8fc34784a7be5130eb082760d24387b',
    HUMANLOOP_PROJECT: 'chess-gpt',
  };
}
