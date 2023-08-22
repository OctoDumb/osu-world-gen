import React, { ChangeEvent, FC } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";
import { useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";
import styles from "./index.module.scss";

export type RegionRowProps = {
  index: number;
};

const RegionRow: FC<RegionRowProps> = ({ index }) => {
  const [removeByIndex, updateAtIndex] = useRegionsStore(
    (state) => [state.removeByIndex, state.updateAtIndex],
    shallow
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAtIndex(index, {
      id: e.target.value,
    });
  };

  return (
    <HStack className={styles.regionRow}>
      <Input
        type={"text"}
        placeholder={"Region ID"}
        onChange={onChange}
      />
      <Button
        colorScheme={"red"}
        onClick={() => removeByIndex(index)}
      >
        -
      </Button>
    </HStack>
  );
};

export default RegionRow;
