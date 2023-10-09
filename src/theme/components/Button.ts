import { StyleConfig } from '@chakra-ui/react';

const variants: Record<string, any> = {
  solid: {
    primary: {
      backgroundColor: 'primary.light',
      color: 'black',
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
  outline: {
    black: {
      color: 'gray.500',
      bgColor: 'white',
      borderColor: 'black',
      outline: 'none',
      _hover: {
        bgColor: 'blackAlpha.100',
        borderColor: 'black',
      },
      _focus: {
        borderColor: 'black',
      },
    },
  },
};

export const Button: StyleConfig = {
  baseStyle: {
    // display: 'none',
    fontWeight: '600',
    borderRadius: '0.5em',
  },
  variants: {
    solid: ({ colorScheme }) => variants.solid[colorScheme],
    outline: ({ colorScheme }) => variants.outline[colorScheme],
  },
  sizes: {
    md: {
      height: '44px',
    },
  },
  defaultProps: {
    size: 'md',
  },
};
