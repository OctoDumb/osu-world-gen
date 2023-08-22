import React, { FC } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent, DrawerFooter,
  DrawerHeader,
  DrawerOverlay, HStack, VStack, useToast
} from "@chakra-ui/react";
import RegionRow from "@components/RegionRow";
import { useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";
import { useModalStore } from "@components/store/modalStore";

export type RegionsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const RegionsDrawer: FC<RegionsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const toast = useToast();

  const [data, addEmpty] = useRegionsStore(
    (state) => [state.data, state.addEmpty],
    shallow
  );

  const toggleInput = useModalStore((state) => state.toggleInput);

  const renderRegions = () => data.map((item, i) => (
    <RegionRow index={i} item={item}/>
  ));

  const copy = () => {
    navigator.clipboard.writeText(data.map(i => i.id).join(', '));
    toast({
      title: 'Copied!',
      variant: 'solid',
      status: 'success',
      isClosable: true,
    })
  };

  const input = () => {};

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
          <VStack
            width={"100%"}
          >
            <HStack
              width={"100%"}
            >
              <Button
                colorScheme={"yellow"}
                width={"100%"}
                onClick={copy}
              >
                Copy
              </Button>
              <Button
                colorScheme={"facebook"}
                width={"100%"}
                onClick={toggleInput}
              >
                Input
              </Button>
            </HStack>
            <Button
              width={"100%"}
              colorScheme={"green"}
              onClick={addEmpty}
            >
              Add new
            </Button>
          </VStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default RegionsDrawer;
