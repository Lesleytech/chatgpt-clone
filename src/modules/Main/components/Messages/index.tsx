import { Box, VStack } from '@chakra-ui/react';

import { useChat } from '~/utils/hooks/useChat';

import MessageItem from './MessageItem';

const Messages = () => {
  const { messages } = useChat();

  return (
    <Box pos="relative" h="100%">
      <VStack spacing="1.25em" alignItems="unset">
        {messages.map((msg, i) => (
          <MessageItem title={msg.role} content={msg.content || ''} key={i} />
        ))}
      </VStack>
      {/*<Button*/}
      {/*  bg="#282C34"*/}
      {/*  color="#989898"*/}
      {/*  pos="absolute"*/}
      {/*  colorScheme="none"*/}
      {/*  size="sm"*/}
      {/*  fontWeight="normal"*/}
      {/*  bottom="0"*/}
      {/*  left="50%"*/}
      {/*  transform="translateX(-50%)">*/}
      {/*  Generate Content*/}
      {/*</Button>*/}
    </Box>
  );
};

export { Messages };
