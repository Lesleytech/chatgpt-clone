import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { RiDeleteBin7Line } from 'react-icons/ri';

const UserInput = () => {
  return (
    <Box>
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
      <Input colorScheme="black" variant="outline" />
    </Box>
  );
};

export { UserInput };
