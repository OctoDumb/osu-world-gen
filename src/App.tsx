import React from "react";
import { Button, ChakraProvider, useDisclosure } from "@chakra-ui/react";
import Map from "@components/Map";
import "leaflet/dist/leaflet.css";
import styles from "./index.module.scss";
import "./index.scss";
import RegionsDrawer from "@components/RegionsDrawer";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Button
        className={styles.drawerButton}
        onClick={onOpen}
        colorScheme={"green"}
      >
        Add
      </Button>
      <Map/>
      <RegionsDrawer isOpen={isOpen} onClose={onClose} />
    </ChakraProvider>
  );
};

export default App;
