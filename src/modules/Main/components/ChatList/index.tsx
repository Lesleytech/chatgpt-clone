import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { RiAddFill } from 'react-icons/ri';

import { formatUnixTime } from '~/utils/format';
import { useChat } from '~/utils/hooks/useChat';

import ChatListItem from './ChatListItem';

const ChatList = () => {
  const { chatRooms, activeRoomId, onAddRoom, onRemoveRoom, onActiveRoomChange, onClearRooms } =
    useChat();

  return (
    <Flex h="100%" flexDir="column">
      <Button
        leftIcon={<RiAddFill size={20} />}
        variant="solid"
        colorScheme="primary"
        onClick={onAddRoom}>
        New Chat
      </Button>
      <Text fontSize={{ base: 'lg', lg: '2xl' }} fontWeight="500" my="1em">
        Chat List
      </Text>
      <VStack flex="1" alignItems="unset" spacing="1.75em" overflowY="auto">
        {chatRooms.length ? (
          chatRooms.map((room) => (
            <ChatListItem
              title={room.name || 'New chat'}
              date={formatUnixTime(room.createdAt)}
              key={room.id}
              onDelete={() => onRemoveRoom(room.id)}
              isActive={room.id === activeRoomId}
              onClick={() => onActiveRoomChange(room.id)}
            />
          ))
        ) : (
          <Text color="textSecondary">No chat yet</Text>
        )}
      </VStack>
      <Button colorScheme="red" onClick={onClearRooms} isDisabled={!chatRooms.length}>
        Clear All
      </Button>
    </Flex>
  );
};

export { ChatList };
