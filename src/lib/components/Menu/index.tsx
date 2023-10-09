import { Center, Divider, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

import { IMenuItem } from '~/lib/components/interfaces/menu.interface';

interface IProps {
  items: IMenuItem[];
  activeKey?: string;
  onClick?: (key?: string) => void;
}

const Menu: FC<IProps> = ({ items, activeKey, onClick }) => {
  return (
    <Flex flexDir="column">
      {items.map(({ icon, type, label, key, onClick: onItemClick }) => {
        if (type === 'divider') return <Divider my="0.5em" />;

        const isActiveKey = key === activeKey;

        return (
          <Flex
            gap="1em"
            key={key}
            cursor="pointer"
            onClick={() => {
              onClick?.(key);
              onItemClick?.();
            }}
            py="0.875em"
            alignItems="center"
            _hover={{ transform: 'scale(1.25)', left: '10%' }}
            position="relative"
            left={isActiveKey ? '10%' : 0}
            transform={isActiveKey ? 'scale(1.25)' : 'scale(1)'}
            transition="all 0.25s ease-in-out"
            fontWeight={isActiveKey ? 'bold' : 'normal'}>
            <>
              <Center fontSize="1.3em">{icon}</Center>
              <Text>{label}</Text>
            </>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default Menu;
