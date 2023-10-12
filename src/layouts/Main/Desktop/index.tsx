import { Box, Center, Flex, Image } from '@chakra-ui/react';

import { ChatList, Messages, SideMenu, UserInput } from '~/modules/Main/components';
import { useChat } from '~/utils/hooks/useChat';
import { ASSET_RESOURCES } from '~/utils/resources';

const DesktopLayout = () => {
  const { activeRoomId } = useChat();

  return (
    <Flex flexDir="column" h="100vh" w="100vw" pt="3em" pr="3em">
      <Flex flex="1" overflowY="hidden">
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
          {activeRoomId && (
            <>
              <Box gridArea="msges" py="3em" overflowY="auto" px="0 !important">
                <Box overflowY="auto" px="2em">
                  <Messages />
                </Box>
              </Box>
              <Box gridArea="input" borderTop="1px solid" pt="1.5em">
                <UserInput />
              </Box>
            </>
          )}
          <Box gridArea="chats" borderLeft="1px solid" pt="3em">
            <ChatList />
          </Box>
        </Box>
      </Flex>
      <Center py="1em">
        <Image src={ASSET_RESOURCES.asiLogo} alt="ASI logo" />
      </Center>
    </Flex>
  );
};

export default DesktopLayout;
