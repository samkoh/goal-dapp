import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { NextPage } from "next";
import { Box, Container, Flex } from "@chakra-ui/react";
import AccountabilityCard from "../components/AccountabilityCard";


const Home: NextPage = () => {

  const address = useAddress();

  return (
    <Container maxW={"1440px"}>
      <Flex justifyContent={"right"} flexDirection={"row"} >
        <ConnectWallet />
      </Flex>

      <Flex alignItems={"right"} height={"100vh"} flexDirection={"column"}>
        <Box h={"20px"}>
          {address && (
            <AccountabilityCard />
          )}
        </Box>
      </Flex>
    </Container>
  );
};

export default Home;
