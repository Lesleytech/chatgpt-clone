import { Box, Center, Flex, IconButton, Image, useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { RiMenu2Line, RiUserLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { Drawer } from '~/lib/components/Drawer';
import { ChatList, SideMenu } from '~/modules/Main/components';
import { useChat } from '~/utils/hooks/useChat';
import { ASSET_RESOURCES } from '~/utils/resources';

const MobileChatsPage = () => {
  const { activeRoomId } = useChat();
  const { isOpen: isDrawerOpen, onClose: onDrawerClose, onOpen: onDrawerOpen } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    if (activeRoomId) {
      navigate(`/messages`);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRoomId]);

  return (
    <>
      <Box h="100%" display="grid" gridTemplateRows="45px 1fr">
        <Flex px="1em" shadow="sm" justifyContent="space-between" alignItems="center">
          <IconButton
            aria-label="Open Drawer"
            onClick={onDrawerOpen}
            icon={<RiMenu2Line size={20} />}
            h="unset"
            color="inherit"
            colorScheme="none"
          />
          <IconButton
            aria-label="Profile"
            icon={<RiUserLine size={20} />}
            h="unset"
            color="inherit"
            colorScheme="none"
          />
        </Flex>
        <Box p="1em">
          <ChatList />
        </Box>
      </Box>
      <Drawer isOpen={isDrawerOpen} onClose={onDrawerClose} size="full">
        <Box h="100%" display="grid" gridTemplateRows="1fr auto">
          <SideMenu onMenuClick={onDrawerClose} />
          <Center py="5px">
            <Image src={ASSET_RESOURCES.asiLogo} alt="ASI logo" />
          </Center>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileChatsPage;
