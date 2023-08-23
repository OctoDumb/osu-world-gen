import { Box, Text } from "@chakra-ui/react";
import { useHoverStore } from "@components/store/hoverStore";
import styles from "./index.module.scss";

const HoverId = () => {
  const content = useHoverStore((state) => state.content);

  if(!content) return null;

  return (
    <Box
      boxShadow={"outline"}
      bgColor={"blue.900"}
      className={styles.hoverId}
    >
      <Text color={"white"} fontWeight={"bold"}>{content}</Text>
    </Box>
  );
};

export default HoverId;