import { Box, Center, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { RiUserLine } from 'react-icons/ri';
import { ReactSVG } from 'react-svg';

import { mediaQueries } from '~/theme/breakpoints';
import { useMediaQuery } from '~/utils/hooks/useMediaQuery';
import { ASSET_RESOURCES } from '~/utils/resources';

interface IProps {
  title: string;
  content: string;
}

const MessageItem: FC<IProps> = ({ title, content }) => {
  const isMobile = useMediaQuery(mediaQueries.MOBILE);

  return (
    <Flex
      alignItems="flex-start"
      p={{ base: '0.5em 0.875em', lg: '1em 1.5em' }}
      bg="white"
      border="1px solid"
      borderRadius="xl"
      boxShadow="lg">
      {!isMobile && (
        <Center my="0.5em" mr="1.5em">
          {title === 'user' ? <RiUserLine size={24} /> : <ReactSVG src={ASSET_RESOURCES.asiIcon} />}
        </Center>
      )}
      <Box fontSize={{ base: '0.875rem', lg: '1rem' }}>
        <Text fontWeight="600" mb="0.5em" textTransform="capitalize">
          {title}
        </Text>
        <Text mb="0.5em">{content}</Text>
      </Box>
    </Flex>
  );
};

export default MessageItem;
