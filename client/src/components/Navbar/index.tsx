import {
  Box,
  Image,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
  HStack,
  Heading,
} from '@chakra-ui/react';
import { Sidebar } from '../Sidebar';
import { ToggleButton } from './ToggleButton';

export const Navbar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Box width="full" py="4" px={{ base: '4', md: '8' }} bg="white" boxShadow="sm">
      <Flex justify="space-between">
        <HStack spacing="6">
          <Image boxSize="3rem" src="/logo.png" alt="Logo" />
          <Heading fontSize="1.1rem" lineHeight="sm">
            AppConnect Integration Admin
          </Heading>
        </HStack>
        <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} isFullHeight preserveScrollBarGap trapFocus={true}>
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
