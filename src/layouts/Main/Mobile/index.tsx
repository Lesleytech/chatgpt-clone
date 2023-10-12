import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const MobileLayout = () => {
  return (
    <Box pos="fixed" left="0" right="0" bottom="0" top="0">
      <Outlet />
    </Box>
  );
};

export default MobileLayout;
