import React from "react";
import { Input, Box, Icon, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { MdDateRange } from "react-icons/md";

const DraggableDate: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type: "date" },
  }));

  return (
    <Box
      ref={drag}
      p="4"
      bg="green.100"
      borderRadius="md"
      shadow="md"
      cursor="grab"
    >
      <Icon as={MdDateRange} w={6} h={6} mb="2" />
      <Text>Date Picker</Text>
      <Input colorScheme="white" variant="filled" type="date" />
    </Box>
  );
};

export default DraggableDate;
