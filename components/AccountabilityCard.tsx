import { useContract, useContractRead } from "@thirdweb-dev/react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import { Box, Card, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { ethers } from "ethers";
import DepositFunds from "./Deposit";
import Tasks from "./Tasks";

export default function AccountabilityCard() {
    const { contract } = useContract(ACCOUNTABILITY_CONTRACT)

    const {
        data: depositAmount,
        isLoading: isDepositAmountLoading,
    } = useContractRead(contract, "getDeposit");

    const {
        data: taskCount,
        isLoading: isTaskLoading,
    } = useContractRead(
        contract,
        "getTaskCount"
    );

    return (
        <Card w={"100%"} p={10} textAlign={"center"}>
            <Heading fontSize={"5xl"}>Accountability App</Heading>
            {!isDepositAmountLoading && !isTaskLoading ? (
                <Box>
                    {depositAmount == 0 && taskCount == 0 ? (
                        // <Text>Make a deposit</Text>
                        <DepositFunds />
                    ) : (
                        <Stack spacing={8}>
                            <Box>
                                <Text fontSize={"2xl"} fontWeight={"bold"}>Goal amount: {ethers.utils.formatEther(depositAmount)} MATIC.</Text>
                                <Text fontSize={"medium"} >Deposit amount will be transferred back when all tasks are completed</Text>
                            </Box>
                            <Tasks />
                        </Stack>
                    )}
                </Box>
            ) : (
                <Spinner />
            )}
        </Card>
    )
}