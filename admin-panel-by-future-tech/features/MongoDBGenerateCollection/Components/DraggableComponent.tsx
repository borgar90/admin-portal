import { useRef } from "react";
import { useDrag } from "react-dnd";
import { Box, Text } from "@chakra-ui/react";

interface DraggableItemProps {
  type: string;
}

const DraggableItem: React.FC<DraggableItemProps> = ({ type }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "field",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Connect the drag source to the ref
  drag(ref);

  return (
    <Box ref={ref} p={2} bg="blue.200" opacity={isDragging ? 0.5 : 1}>
      <Text>{type}</Text>
    </Box>
  );
};

export default DraggableItem;
