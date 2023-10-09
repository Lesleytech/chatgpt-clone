import { Box, Center, Flex, Image, Spinner } from '@chakra-ui/react';

import { ChatList, Messages, SideMenu, UserInput } from '~/modules/Main/components';
import { ASSET_RESOURCES } from '~/utils/resources';

const DesktopLayout = () => {
  return (
    <Flex flexDir="column" h="100vh" w="100vw" pt="3em" pr="3em">
      <Flex flex="1">
        <Box w="375px" px="3em">
          <SideMenu />
        </Box>
        <Box
          flex="1"
          bg="#D9D9D933"
          borderRadius="3xl"
          display="grid"
          gridTemplate="1fr auto / 1fr minmax(300px, 0.3fr)"
          gridTemplateAreas="'msges chats''input chats'"
          css={{ '> div': { paddingLeft: '2em', paddingRight: '2em', paddingBottom: '1.5em' } }}>
          <Box gridArea="msges" pt="3em">
            <Messages />
          </Box>
          <Box gridArea="input" borderTop="1px solid" pt="1.5em">
            <UserInput />
          </Box>
          <Box gridArea="chats" borderLeft="1px solid" pt="3em">
            <ChatList />
          </Box>
        </Box>
      </Flex>
      <Center py="1em">
        <Image src={ASSET_RESOURCES.asiLogo} />
      </Center>
    </Flex>
  );
};

export default DesktopLayout;
