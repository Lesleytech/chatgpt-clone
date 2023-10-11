import { Button, Flex, Text, VStack } from '@chakra-ui/react';
import { useCallback, useEffect } from 'react';
import { RiAddFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { idbService } from '~/services/idb.service';
import { chatActions } from '~/store/chat';
import { formatUnixTime } from '~/utils/format';
import { useChat } from '~/utils/hooks/useChat';

import ChatListItem from './ChatListItem';

const ChatList = () => {
  const { chatRooms, activeRoomId, onAddRoom, onRemoveRoom, onActiveRoomChange, onClearRooms } =
    useChat();

  const dispatch = useDispatch();

  const getInitialRooms = useCallback(async () => {
    const rooms = await idbService.getRooms();

    if (rooms) {
      dispatch(chatActions.setInitialRooms(rooms));
    }
  }, [dispatch]);

  useEffect(() => {
    getInitialRooms();
  }, []);

  return (
    <Flex h="100%" flexDir="column">
      <Button
        leftIcon={<RiAddFill size={20} />}
        variant="solid"
        colorScheme="primary"
        onClick={onAddRoom}>
        New Chat
      </Button>
      <Text fontSize="2xl" fontWeight="500" my="1em">
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
      <Button colorScheme="red" onClick={onClearRooms}>
        Clear All
      </Button>
    </Flex>
  );
};

export { ChatList };
