import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { Messages, UserInput } from '~/modules/Main/components';
import { chatActions } from '~/store/chat';
import { useChat } from '~/utils/hooks/useChat';

const MobileMessagesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { activeRoom } = useChat();

  useEffect(() => {
    return () => {
      dispatch(chatActions.setActiveRoom(''));
    };
  }, [dispatch]);

  if (!activeRoom) {
    return <Navigate to="/" replace />;
  }

  return (
    <Box h="100%" display="grid" gridTemplateRows="45px 1fr auto">
      <Flex px="1em" alignItems="center" shadow="sm">
        <IconButton
          aria-label="Go back"
          icon={<RiArrowLeftLine size={20} />}
          size="lg"
          h="unset"
          py="0.25em"
          colorScheme="none"
          color="inherit"
          onClick={() => navigate('/', { replace: true })}
        />
        <Text fontWeight="bold" noOfLines={1} px="1em">
          {activeRoom.name || 'New chat'}
        </Text>
      </Flex>
      <Box px="1em" overflowY="auto" shadow="sm" position="relative">
        <Box py="1em" h="100%">
          <Messages />
        </Box>
      </Box>
      <Box p="1em">
        <UserInput />
      </Box>
    </Box>
  );
};

export default MobileMessagesPage;
