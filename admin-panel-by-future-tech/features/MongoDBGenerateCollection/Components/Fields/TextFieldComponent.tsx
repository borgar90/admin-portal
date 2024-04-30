import React from "react";
import { Input, Box, Icon, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { MdTextFields } from "react-icons/md";

const DraggableText: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type: "text" },
  }));

  return (
    <Box
      ref={drag}
      p="4"
      bg="blue.100"
      borderRadius="md"
      shadow="md"
      cursor="grab"
    >
      <Icon as={MdTextFields} w={6} h={6} mb="2" />
      <Text>Text Field</Text>
      <Input colorScheme="white" variant="filled" placeholder="Enter text" />
    </Box>
  );
};

export default DraggableText;
