import { Box, Button, VStack } from '@chakra-ui/react';

import MessageItem from './MessageItem';

const Messages = () => {
  return (
    <Box pos="relative" h="100%">
      <VStack spacing="1.25em">
        <MessageItem
          title="Personalization"
          content="Al can analyze user data and behavior to create personalized experiences for individual users. This can help designers create interfaces that adapt to each user’s preferences, making the interface   more intuitive and user-friendly."
        />
        <MessageItem
          title="Personalization"
          content="Al can analyze user data and behavior to create personalized experiences for individual users. This can help designers create interfaces that adapt to each user’s preferences, making the interface   more intuitive and user-friendly."
        />
        <MessageItem
          title="Personalization"
          content="Al can analyze user data and behavior to create personalized experiences for individual users. This can help designers create interfaces that adapt to each user’s preferences, making the interface   more intuitive and user-friendly."
        />
      </VStack>
      <Button
        bg="#282C34"
        color="#989898"
        pos="absolute"
        colorScheme="none"
        size="sm"
        fontWeight="normal"
        bottom="0"
        left="50%"
        transform="translateX(-50%)">
        Generate Content
      </Button>
    </Box>
  );
};

export { Messages };
