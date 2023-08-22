import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import { useRegionsStore } from "@components/store";
import { useModalStore } from "@components/store/modalStore"
import { useRef, useState } from "react";
import { shallow } from "zustand/shallow"

const RegionInputModal = () => {
  const [isOpen, toggle] = useModalStore(
    (state) => [state.inputOpen, state.toggleInput],
    shallow
  );

  const addBulk = useRegionsStore((state) => state.addBulk);

  const [ids, setIds] = useState<string>("");

  const input = useRef<HTMLTextAreaElement>(null);

  const add = () => {
    addBulk(ids.replaceAll(",", "\n").split("\n").map(id => id.trim()).filter(id => id));
    input.current!.value = "";
    setIds("");
    toggle();
  };

  return (
    <Modal isOpen={isOpen} onClose={toggle} size={"2xl"}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Bulk add regions</ModalHeader>
        <ModalBody>
          <Text fontSize={14} mb={3}>IDs should be separated by new lines or commas (,)</Text>
          <Input
            ref={input}
            placeholder="Put IDs here"
            minHeight={200}
            as="textarea"
            onChange={e => setIds(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={"green"}
            onClick={add}
          >
            Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RegionInputModal;