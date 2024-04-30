import React from "react";
import { Box, Text } from "@chakra-ui/react";
import DraggableItem from "@/features/MongoDBGenerateCollection/Components/DraggableComponent";
import DraggableText from "../../Components/Fields/TextFieldComponent";
import DraggableDate from "../../Components/Fields/DateFieldComponent";
import DraggableFile from "../../Components/Fields/FileFieldComponent";
const LeftMenuLayout: React.FC = () => {
  return (
    <div
      className="absolute  top-0 bottom-0 left-0 w-[300px] flex flex-col shadow-md bg-gray-50 "
      style={{ minHeight: "100vh" }}
    >
      <Text fontSize="md" fontWeight="bold" className="bg-blue-50 p-5">
        New Field
      </Text>
      <Box className="p-5 flex flex-col gap-5">
        <DraggableText />
        <DraggableDate />
        <DraggableFile />
      </Box>
    </div>
  );
};
export default LeftMenuLayout;
