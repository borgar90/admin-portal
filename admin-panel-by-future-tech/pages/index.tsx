import { useState } from "react";
import axios from "axios";
import getServer from "@/getServer";
import {
  Button,
  Card,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  position,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
} from "@chakra-ui/react";
import DraggableItem from "@/features/MongoDBGenerateCollection/Components/DraggableComponent";
import Canvas from "@/features/MongoDBGenerateCollection/Components/CanvasComponent";
import LeftMenuLayout from "@/features/MongoDBGenerateCollection/Layout/Sections/LeftMenu";

interface Field {
  name: string;
  type: string;
}

const Home = () => {
  const [collectionName, setCollectionName] = useState("");
  const [fields, setFields] = useState<Field[]>([{ name: "", type: "String" }]);
  const [connectionString, setConnectionString] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleAddField = () => {
    setFields([...fields, { name: "", type: "String" }]);
  };

  const handleFieldChange = (index: number, field: Partial<Field>) => {
    const newFields = fields.map((f, idx) =>
      idx === index ? { ...f, ...field } : f
    );
    setFields(newFields);
  };

  const handleSubmit = async () => {
    const data = {
      collectionName,
      fields,
      connectionString,
    };
    try {
      const response = await axios.post(getServer() + "/api/collections", data);
      alert("Collection created: " + response.data.message);
    } catch (error: any) {
      //TODO fix error type !
      alert("Error creating collection: " + error.message);
    }
  };

  const form = "flex flex-col gap-5";

  return (
    <>
      <LeftMenuLayout />
      <Container maxW={"container.lg"} className="pt-5">
        <div>
          <h1 className="text-4xl">Create MongoDB Collection</h1>
          <Card className="mt-5 p-5">
            {!connectionString && (
              <div className={form}>
                <FormControl>
                  <FormLabel>Connection String</FormLabel>
                  <Input
                    type="text"
                    value={connectionString}
                    onChange={(e) => setConnectionString(e.target.value)}
                    placeholder="MongoDB Connection String"
                  />
                  <FormHelperText>
                    You can get this from your MongoDB Atlas dashboard, or use a
                    local MongoDB instance.
                    <br />
                    Example: mongodb://localhost:27017/mydatabase
                    <br />
                    we&apos;ll use this to connect to your MongoDB database, and
                    we&apos;ll never share it.
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <Button colorScheme="blue" onClick={handleAddField}>
                    Add Field
                  </Button>
                  <FormHelperText>
                    Add fields to your collection. You can always add more
                    fields later.
                  </FormHelperText>
                </FormControl>
              </div>
            )}

            {connectionString && !collectionName ? (
              <div className={form}>
                <FormControl>
                  <FormLabel>Collection Name</FormLabel>
                  <FormHelperText>
                    The name of the collection you want to create.
                  </FormHelperText>
                  <Input
                    type="text"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                    placeholder="Collection Name"
                  />
                </FormControl>
                <FormControl>
                  <Button
                    colorScheme="green"
                    variant="solid"
                    onClick={handleSubmit}
                  >
                    Create Collection
                  </Button>
                </FormControl>
              </div>
            ) : (
              connectionString &&
              collectionName && (
                <>
                  <Canvas />
                </>
              )
            )}
          </Card>
        </div>
      </Container>
    </>
  );
};

export default Home;
