import React, { FC } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay, VStack
} from "@chakra-ui/react";
import RegionRow from "@components/RegionRow";
import { useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";

export type RegionsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegionsDrawer: FC<RegionsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, addEmpty] = useRegionsStore(
    (state) => [state.data, state.addEmpty],
    shallow
  );

  const renderRegions = () => data.map((item, i) => (
    <RegionRow index={i} item={item}/>
  ));

  return (
    <Drawer
      isOpen={isOpen}
      placement={"right"}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Add regions</DrawerHeader>

        <DrawerBody>
          <VStack>
            {renderRegions()}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button
            width={"100%"}
            colorScheme={"green"}
            onClick={addEmpty}
          >
            Add new
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionsDrawer;
