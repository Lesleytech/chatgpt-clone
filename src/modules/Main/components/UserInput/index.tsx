import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { RiDeleteBin7Line } from 'react-icons/ri';

import { useChat } from '~/utils/hooks/useChat';

const UserInput = () => {
  const [inputValue, setInputValue] = useState('');

  const { onSend } = useChat();

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
