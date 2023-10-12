import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { RiUserLine } from 'react-icons/ri';
import { ReactSVG } from 'react-svg';

import { IChatMessage } from '~/lib/interfaces/chat';
import { mediaQueries } from '~/theme/breakpoints';
import { useMediaQuery } from '~/utils/hooks/useMediaQuery';
import { ASSET_RESOURCES } from '~/utils/resources';

interface IProps {
  data: IChatMessage;
}

const MessageItem: FC<IProps> = ({ data }) => {
  const isMobile = useMediaQuery(mediaQueries.MOBILE);

  const { generating, content, role } = data;

  return (
    <Flex
      className="message-item"
      alignItems="flex-start"
      p={{ base: '0.5em 0.875em', lg: '1em 1.5em' }}
      bg="white"
      border="1px solid"
      borderRadius="xl"
      boxShadow="lg">
      {!isMobile && (
        <Center my="0.5em" mr="1.5em">
          {role === 'user' ? <RiUserLine size={24} /> : <ReactSVG src={ASSET_RESOURCES.asiIcon} />}
        </Center>
      )}
      <Box fontSize={{ base: '0.875rem', lg: '1rem' }}>
        <Text fontWeight="600" mb="0.5em" textTransform="capitalize">
          {role}
        </Text>
        <Text mb="0.5em" minH="1em">
          {content}
          {generating && (
            <Box
              w="10px"
              h="10px"
              as="span"
              bg="blackAlpha.700"
              display="inline-block"
              borderRadius="50%"
              mx="0.5em"
              animation="typing 1s infinite ease-in-out"
            />
          )}
        </Text>
      </Box>
    </Flex>
  );
};

export default MessageItem;
