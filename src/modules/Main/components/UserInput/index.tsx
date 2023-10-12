import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import { chatActions } from '~/store/chat';
import { useChat } from '~/utils/hooks/useChat';

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const { onSend, messages, activeRoomId, onRegenerate } = useChat();

  const canRegenerate = !!messages.length && messages[messages.length - 1].role !== 'user';

  return (
    <Box
      as="form"
      position="relative"
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
            if (canRegenerate) dispatch(chatActions.deleteLastMessage(activeRoomId));
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
      {canRegenerate && (
        <Button
          bg="#282C34"
          color="#989898"
          pos="absolute"
          colorScheme="none"
          size="sm"
          fontWeight="normal"
          top="-60px"
          left="50%"
          zIndex="2"
          onClick={onRegenerate}
          transform="translateX(-50%)">
          Generate Content
        </Button>
      )}
    </Box>
  );
};

export { UserInput };
