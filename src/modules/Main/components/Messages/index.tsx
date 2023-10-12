import { Box, VStack } from '@chakra-ui/react';
import { useEffect } from 'react';

import { useChat } from '~/utils/hooks/useChat';

import MessageItem from './MessageItem';

const Messages = () => {
  const { messages } = useChat();

  useEffect(() => {
    if (!messages.length) return;

    setTimeout(() => {
      const lastMessageElem = document.querySelector(
        '.messages-stack .message-item:last-of-type',
      ) as HTMLElement;

      lastMessageElem?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  return (
    <>
      <Box h="100%">
        <VStack spacing="1.25em" alignItems="unset" className="messages-stack" pb="5em">
          {messages.map((msg, i) => (
            <MessageItem data={msg} key={i} />
          ))}
        </VStack>
      </Box>
    </>
  );
};

export { Messages };
