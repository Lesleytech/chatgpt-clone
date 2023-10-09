import { Box, Center, Flex, Image, Spinner } from '@chakra-ui/react';

import { SideMenu } from '~/modules/Main/components';

const DesktopLayout = () => {
  return (
    <Flex flexDir="column" h="100vh" w="100vw" pt="3em" pr="3em">
      <Flex flex="1">
        <Box w="375px" px="3em">
          <SideMenu />
        </Box>
        <Box flex="1" bg="gray.100" borderRadius="3xl">
          <Spinner />
        </Box>
      </Flex>
      <Center py="1em">
        <Image src="/assets/images/asi-logo.svg" />
      </Center>
    </Flex>
  );
};

export default DesktopLayout;
