import { ComponentStyleConfig } from '@chakra-ui/react';

export const Input: ComponentStyleConfig = {
  baseStyle: {
    // fontSize: '0.9rem !important',
    borderRadius: 'lg',
  },
  variants: {
    filled: ({ colorScheme }) => ({
      field:
        colorScheme === 'primary'
          ? {
              backgroundColor: 'primary.light',
              _hover: {
                backgroundColor: 'primary.light',
              },
              _focus: {
                borderColor: 'primary.main',
              },
              _invalid: {
                // borderColor: 'error',
              },
            }
          : {},
    }),
  },
  defaultProps: {
    // focusBorderColor: 'primary.main',
    // errorBorderColor: 'error',
  },
};
