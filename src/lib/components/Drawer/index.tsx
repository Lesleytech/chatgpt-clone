import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  ModalCloseButton,
  ModalHeader,
  ModalProps,
} from '@chakra-ui/react';
import { FC, PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  size?: ModalProps['size'];
}

const Drawer: FC<IProps> = ({ onClose, isOpen, children, title, size }) => {
  return (
    <ChakraDrawer placement="left" onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <ModalCloseButton />
        {title && <ModalHeader>{title}</ModalHeader>}

        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </ChakraDrawer>
  );
};

export { Drawer };
