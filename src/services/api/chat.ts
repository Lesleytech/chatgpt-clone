import { IChatMessage } from '~/lib/interfaces/chat';
import { apiClient } from '~/services/axios.service';

export async function syncMessages(
  messages: IChatMessage[],
): Promise<{ error?: boolean; content: string }> {
  return apiClient
    .post<string>('/chat', { messages: messages.filter((m) => !m.error) })
    .then((res) => ({ content: res.data }))
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);

      return { content: 'Error generating response', error: true };
    });
}
