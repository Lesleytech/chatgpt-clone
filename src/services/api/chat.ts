import { ChatMessage, Humanloop } from 'humanloop';

const HUMANLOOP_API_KEY = 'hl_sk_29f6888a76399730e8fc34784a7be5130eb082760d24387b';
const HUMANLOOP_PROJECT = 'chess-gpt';

const humanloop = new Humanloop({
  basePath: 'https://api.humanloop.com/v4',
  apiKey: HUMANLOOP_API_KEY,
});

export async function syncMessages(messages: ChatMessage[]) {
  const res = await humanloop.chatDeployed({
    project: HUMANLOOP_PROJECT,
    messages,
  });

  return res.data.data[0].output;
}
