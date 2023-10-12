import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { chatActions } from '~/store/chat';
import { useChat } from '~/utils/hooks/useChat';

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const { onSend, messages, activeRoomId } = useChat();

  const canDeleteLastGeneration =
    !!messages.length && messages[messages.length - 1].role !== 'user';

  return (
    <Box
      as="form"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();

        onSend(inputValue);
        setInputValue('');
      }}>
      <Flex gap="0.5em" mb="0.65em">
        <Button
          size="sm"
          variant="outline"
          fontWeight="normal"
          colorScheme="black"
          onClick={() => {
            if (canDeleteLastGeneration) dispatch(chatActions.deleteLastMessage(activeRoomId));
          }}
          leftIcon={<RiDeleteBin7Line color="red" />}>
          Delete last Generation
        </Button>
        <Button size="sm" variant="outline" colorScheme="black" fontWeight="normal">
          Listen
        </Button>
      </Flex>
      <Input
        colorScheme="black"
        variant="outline"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Box>
  );
};

export { UserInput };
