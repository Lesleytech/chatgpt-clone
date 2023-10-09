import { ComponentStyleConfig } from '@chakra-ui/react';

const variants: Record<string, any> = {
  outline: {
    black: {
      bgColor: 'white',
      borderColor: 'black',
      outline: 'none',
      _hover: {
        bgColor: 'white',
        borderColor: 'black',
      },
      _focus: {
        borderColor: 'black',
      },
    },
  },
  filled: {
    primary: {
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
    },
  },
};

export const Input: ComponentStyleConfig = {
  baseStyle: {
    borderRadius: '0.5em',
  },
  variants: {
    filled: ({ colorScheme }) => ({
      field: variants.filled[colorScheme],
    }),
    outline: ({ colorScheme }) => ({
      field: variants.outline[colorScheme],
    }),
  },
  sizes: {
    md: {
      field: {
        height: '44px',
      },
    },
  },
  defaultProps: {
    // focusBorderColor: 'primary.main',
    // errorBorderColor: 'error',
  },
};
