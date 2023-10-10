import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';

import ChatListItem from './ChatListItem';

const ChatList = () => {
  return (
    <Flex h="100%" flexDir="column">
      <Button leftIcon={<RiAddFill size={20} />} variant="solid" colorScheme="primary">
        New Chat
      </Button>
      <Text fontSize="2xl" fontWeight="500" my="1em">
        Chat List
      </Text>
      <VStack flex="1" alignItems="unset" spacing="1.75em">
        <ChatListItem title="What is inflation?" date="08 Apr" />
        <ChatListItem title="What is inflation?" date="08 Apr" />
        <ChatListItem title="What is inflation?" date="08 Apr" />
      </VStack>
      <Button colorScheme="red">Clear All</Button>
    </Flex>
  );
};

export { ChatList };
