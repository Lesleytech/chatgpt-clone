import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { RiUserLine } from 'react-icons/ri';
import { ReactSVG } from 'react-svg';

import { ASSET_RESOURCES } from '~/utils/resources';

interface IProps {
  title: string;
  content: string;
}

const MessageItem: FC<IProps> = ({ title, content }) => {
  return (
    <Flex
      alignItems="flex-start"
      p="1em 1.5em"
      bg="white"
      border="1px solid"
      borderRadius="xl"
      boxShadow="lg">
      <Center my="0.5em" mr="1.5em">
        {title === 'user' ? <RiUserLine size={24} /> : <ReactSVG src={ASSET_RESOURCES.asiIcon} />}
      </Center>
      <Box>
        <Text fontWeight="600" mb="0.5em" textTransform="capitalize">
          {title}
        </Text>
        <Text mb="0.65em">{content}</Text>
      </Box>
    </Flex>
  );
};

export default MessageItem;
