import React from "react";
import { Input, Box, Icon, Text } from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { MdAttachFile } from "react-icons/md";

const DraggableFile: React.FC = () => {
  const [, drag] = useDrag(() => ({
    type: "field",
    item: { type: "file" },
  }));

  return (
    <Box
      ref={drag}
      p="4"
      bg="red.100"
      borderRadius="md"
      shadow="md"
      cursor="grab"
    >
      <Icon as={MdAttachFile} w={6} h={6} mb="2" />
      <Text>File Upload</Text>
      <Input colorScheme="white" variant="filled" type="file" />
    </Box>
  );
};

export default DraggableFile;
