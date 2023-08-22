import React, { ChangeEvent, FC } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";
import { RegionItem, useRegionsStore } from "@components/store";
import { shallow } from "zustand/shallow";
import styles from "./index.module.scss";

export type RegionRowProps = {
  index: number;
  item: RegionItem;
};

const RegionRow: FC<RegionRowProps> = ({ index, item }) => {
  const [removeByIndex, updateAtIndex] = useRegionsStore(
    (state) => [state.removeByIndex, state.updateAtIndex],
    shallow
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("on change", item)
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
        value={item.id}
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
