import { Box, Button, VStack } from '@chakra-ui/react';

import { useChat } from '~/utils/hooks/useChat';

import MessageItem from './MessageItem';

const Messages = () => {
  const { onRegenerate, messages } = useChat();

  const canRegenerate = !!messages.length && messages[messages.length - 1].role !== 'user';

  return (
    <Box pos="relative" h="100%">
      <VStack spacing="1.25em" alignItems="unset">
        {messages.map((msg, i) => (
          <MessageItem title={msg.role} content={msg.content || ''} key={i} />
        ))}
      </VStack>
      {canRegenerate && (
        <Button
          bg="#282C34"
          color="#989898"
          pos="absolute"
          colorScheme="none"
          size="sm"
          fontWeight="normal"
          bottom="0"
          left="50%"
          onClick={onRegenerate}
          transform="translateX(-50%)">
          Generate Content
        </Button>
      )}
    </Box>
  );
};

export { Messages };
