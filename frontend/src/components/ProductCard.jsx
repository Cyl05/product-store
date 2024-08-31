import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product';
import React from 'react';

function ProductCard(props) {
    const bg = useColorModeValue("white", "gray.800");
    const textColor = useColorModeValue("gray.600", "gray.200");
    const { deleteProduct, updateProduct } = useProductStore();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [updatedProduct, setUpdatedProduct] = React.useState(props);

    async function handleDelete(id) {
        const { success, message } = await deleteProduct(id);
        if (success) {
            toast({
                title: "Success!", description: message, status: "success", duration: 3000, isClosable: true
            });
        } else {
            toast({
                title: "Error!", description: message, status: "error", duration: 3000, isClosable: true
            });
        };
    }

    async function handleUpdateProduct(id, updatedProduct) {
        const {success, message} = await updateProduct(id, updatedProduct);
        onClose();

        if (success) {
            toast({
                title: "Success!", description: message, status: "success", duration: 3000, isClosable: true
            });
        } else {
            toast({
                title: "Error!", description: message, status: "error", duration: 3000, isClosable: true
            });
        };
    }

    return (
        <Box shadow='lg'
            rounded='lg'
            overflow='hidden'
            transition='all 0.3s'
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={props.image} alt={props.name} h={48} w={"full"} objectFit="cover" />
            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {props.name}
                </Heading>
                <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
                    ${props.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} colorScheme='blue' onClick={onOpen} />
                    <IconButton
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(props.id)}
                        colorScheme='red'
                    />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder='Product Name'
                                name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder='Price'
                                name='price'
                                type='number'
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder='Image URL'
                                name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            colorScheme='blue'
                            mr={3}
                            onClick={() => handleUpdateProduct(props.id, updatedProduct)}
                        >
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ProductCard