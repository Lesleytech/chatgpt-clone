import { extendTheme } from '@chakra-ui/react';

import { Input, Spinner } from '~/theme/components';
import { colors } from '~/theme/foundation';

export const theme = extendTheme({ colors, components: { Input, Spinner } });
