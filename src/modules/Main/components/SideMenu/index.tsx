import { Box, Center } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineLiveHelp } from 'react-icons/md';
import { RiDeleteBin7Line, RiNotificationLine, RiUserLine } from 'react-icons/ri';

import { Logo, SearchInput } from '~/lib/components';
import { IMenuItem } from '~/lib/components/interfaces/menu.interface';
import Menu from '~/lib/components/Menu';

const SideMenu = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>('guideAndFaq');

  const menuItems: IMenuItem[] = useMemo(
    () => [
      {
        label: 'Guide & FAQ',
        icon: <MdOutlineLiveHelp />,
        key: 'guideAndFaq',
        onClick: () => setActiveKey('guideAndFaq'),
      },
      {
        label: 'Clear Conversations',
        icon: <RiDeleteBin7Line />,
        key: 'clearConversations',
      },
      { type: 'divider' },
      {
        label: 'Profile',
        icon: <RiUserLine />,
        key: 'profile',
        onClick: () => setActiveKey('profile'),
      },
      {
        label: 'Notifications',
        icon: <RiNotificationLine />,
        key: 'notifications',
        onClick: () => setActiveKey('notifications'),
      },
      { type: 'divider' },
      {
        label: 'Settings',
        icon: <IoSettingsOutline />,
        key: 'settings',
        onClick: () => setActiveKey('settings'),
      },
      { type: 'divider' },
      {
        label: 'Logout',
        icon: <HiOutlineLogout />,
        key: 'logout',
      },
    ],
    [],
  );

  return (
    <Box h="100%">
      <Center py="1em">
        <Logo />
      </Center>
      <SearchInput />
      <Box mt="4em">
        <Menu items={menuItems} activeKey={activeKey} />
      </Box>
    </Box>
  );
};

export { SideMenu };
