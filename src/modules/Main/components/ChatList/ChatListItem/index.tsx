import { Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { RiArrowDownSLine, RiDeleteBin7Line } from 'react-icons/ri';

interface IProps {
  title: string;
  date: string;
  onDelete?: () => void;
  isActive?: boolean;
  onClick?: () => void;
}

const ChatListItem: FC<IProps> = ({ title, date, onDelete, onClick, isActive }) => {
  return (
    <Flex
      onClick={onClick}
      alignItems="center"
      gap="1em"
      cursor="pointer"
      css={{ ':hover': { '.title': { fontWeight: 'bold' } } }}>
      <Box alignSelf="flex-start" fontSize={{ base: '20px', lg: '26px' }}>
        <RiArrowDownSLine />
      </Box>
      <Box flex="1">
        <Text
          fontSize={{ base: 'md', lg: 'lg' }}
          noOfLines={1}
          className="title"
          fontWeight={isActive ? 'bold' : '500'}
          transition="all 0.1s ease">
          {title}
        </Text>
        <Text fontSize="sm" fontWeight="300">
          {date}
        </Text>
      </Box>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.();
        }}
        aria-label="Delete chat"
        icon={<RiDeleteBin7Line size="1.3em" />}
        colorScheme="none"
        color="inherit"
        h="unset"
      />
    </Flex>
  );
};

export default ChatListItem;
