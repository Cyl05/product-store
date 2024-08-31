import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import React from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: ""
  });

  const toast = useToast();
  const {createProduct} = useProductStore();

  function updateProduct(event) {
    const {name, value} = event.target;
    setNewProduct({...newProduct, [name]: value});
  }

  async function handleProduct() {
    try {
      const response = await createProduct(newProduct);
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid data",
        status: "error",
        isClosable: true
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Product added successfully",
      status: "success",
      isClosable: true
    });
    setNewProduct({name: "", price: "", image: ""});
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"100%"} bg={useColorModeValue("white", "gray.700")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input name="name" placeholder="Product Name" value={newProduct.name} onChange={updateProduct} />
            <Input name="price" placeholder="Product Price" value={newProduct.price} onChange={updateProduct} />
            <Input name="image" placeholder="Product Image Link" value={newProduct.image} onChange={updateProduct} />
            <Button colorScheme='blue' onClick={handleProduct} w="full">Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage