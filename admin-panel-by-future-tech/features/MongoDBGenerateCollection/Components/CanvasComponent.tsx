import { useDrop } from "react-dnd";
import { useState, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";

const Canvas = () => {
  const [fields, setFields] = useState<any[]>([]);

  const ref = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "field",
    drop: (item: any, monitor) => {
      if (monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        addFieldToCanvas(item);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  drop(ref); // Attaching the drop ref to the div

  const addFieldToCanvas = (item: any) => {
    console.log("Adding field to canvas", item);
    const newField = { id: fields.length, item, properties: {} };
    setFields([...fields, newField]);
  };

  return (
    <Box ref={ref} bg="gray.100" p={4} minHeight="200px">
      {fields.length === 0 ? (
        <Text>No fields added yet. Drag and drop a field here.</Text>
      ) : (
        fields.map((field) => <Text key={field.id}>{field.type} Field</Text>)
      )}
    </Box>
  );
};

export default Canvas;
