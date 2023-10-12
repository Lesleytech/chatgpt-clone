import { ChatMessage } from 'humanloop';

import { apiClient } from '~/services/axios.service';

export async function syncMessages(messages: ChatMessage[]) {
  return apiClient
    .post('/chat', { messages })
    .then((res) => res.data)
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);

      return 'Error generating response';
    });
}
