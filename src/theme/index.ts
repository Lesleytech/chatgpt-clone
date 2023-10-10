import { extendTheme } from '@chakra-ui/react';

import { Button, Divider, Input, Spinner } from '~/theme/components';
import { colors, fontSizes } from '~/theme/foundation';

export const theme = extendTheme({
  colors,
  fontSizes,
  components: { Input, Spinner, Button, Divider },
});
