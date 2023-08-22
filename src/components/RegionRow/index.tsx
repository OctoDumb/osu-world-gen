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
  const [removeByIndex, updateAtIndex, fetchById] = useRegionsStore(
    (state) => [state.removeByIndex, state.updateAtIndex, state.fetchById],
    shallow
  );

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateAtIndex(index, {
      id: e.target.value,
    });
  };

  const fetchMap = () => fetchById(item.id);

  return (
    <HStack className={styles.regionRow}>
      <Input
        type={"text"}
        placeholder={"Region ID"}
        onChange={onChange}
        value={item.id}
      />
      <Button
        colorScheme={!item.data ? "green" : "blue"}
        isLoading={item.loading}
        onClick={fetchMap}
      >
        {!item.data ? "fetch" : "refetch"}
      </Button>
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
