import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { RiSearchLine } from 'react-icons/ri';

const SearchInput = () => {
  return (
    <InputGroup variant="filled" size="lg">
      <InputLeftElement pointerEvents="none">
        <RiSearchLine size={20} />
      </InputLeftElement>
      <Input placeholder="Search..." colorScheme="primary" />
    </InputGroup>
  );
};

export { SearchInput };
