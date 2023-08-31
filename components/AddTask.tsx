import { Box, Button, Textarea, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react";
import { Web3Button } from "@thirdweb-dev/react";
import { ACCOUNTABILITY_CONTRACT } from "../const/addresses";
import { useState } from "react";

export default function AddTask() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [task, setTask] = useState("");

    return (
        <Box>
            <Button onClick={onOpen}>Add Task</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="600px" h="400px">
                    <ModalHeader>Add a task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={8}>
                            <Text>Add a task to your accountability list. All tasks must be completed to receive deposit back.</Text>
                            <Box>
                                <Text fontWeight={"bold"}>Task:</Text>
                                <Textarea
                                    h="100px"
                                    placeholder="Your task here"
                                    value={task}
                                    onChange={(e) => setTask(e.target.value)}
                                />

                            </Box>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Web3Button
                            contractAddress={ACCOUNTABILITY_CONTRACT}
                            action={(contract) => contract.call(
                                "creatTask",
                                [task]
                            )}
                            onSuccess={() => {
                                onClose();
                                setTask("");
                                toast({
                                    title: 'Task added.',
                                    description: "Your new task has been added to your list.",
                                    status: 'success',
                                    duration: 9000,
                                    isClosable: true,
                                })
                            }}
                        >Add Task</Web3Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}