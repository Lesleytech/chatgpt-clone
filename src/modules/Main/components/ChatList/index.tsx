import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';

const ChatList = () => {
  return (
    <Flex h="100%" flexDir="column">
      <Button leftIcon={<RiAddFill size={20} />} variant="solid" colorScheme="primary">
        New Chat
      </Button>
      <Text fontSize="2xl" fontWeight="500" my="1em">
        Chat List
      </Text>
      <VStack flex="1"></VStack>
      <Button colorScheme="red">Clear All</Button>
    </Flex>
  );
};

export { ChatList };
