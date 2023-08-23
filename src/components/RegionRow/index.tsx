import React, { ChangeEvent, FC } from "react";
import { Button, HStack, Input, Tooltip } from "@chakra-ui/react";
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

  const renderInput = () => {
    const invalid = item.data && !item.data.properties.names["ISO3166-2"];
    const input = (
      <Input
        errorBorderColor="yellow.400"
        isInvalid={invalid}
        type={"text"}
        placeholder={"Region ID"}
        onChange={onChange}
        value={item.id}
      />
    );
    if(!invalid)
      return input;
    return (
      <Tooltip hasArrow placement='left' label="Missing ISO3166-2">
        {input}
      </Tooltip>
    )
  }

  return (
    <HStack className={styles.regionRow}>
      {renderInput()}
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
