import { Humanloop } from 'humanloop';

import { IChatMessage } from '~/lib/interfaces/chat';
import { getLocalConfig } from '~/services/config.service';

const { HUMANLOOP_API_KEY, HUMANLOOP_PROJECT } = getLocalConfig();

const humanloop = new Humanloop({
  basePath: 'https://api.humanloop.com/v4',
  apiKey: HUMANLOOP_API_KEY,
});

export async function syncMessages(
  messages: IChatMessage[],
): Promise<{ error?: boolean; content: string }> {
  return humanloop
    .chatDeployed({
      project: HUMANLOOP_PROJECT,
      messages: messages.filter((m) => !m.error),
    })
    .then((res) => ({ content: res.data.data[0].output }))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);

      return { content: 'Error generating response', error: true };
    });
}

export async function streamMessages(messages: IChatMessage[]) {
  return humanloop
    .chatDeployedStream({
      project: HUMANLOOP_PROJECT,
      messages: messages.filter((m) => !m.error),
    })
    .then((res) => res.data)
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);

      return { content: 'Error generating response', error: true };
    });
}
