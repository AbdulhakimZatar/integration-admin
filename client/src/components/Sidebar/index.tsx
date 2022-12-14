import { Flex, Stack, Image, HStack, Heading } from '@chakra-ui/react';
import { FiBarChart2, FiBookmark, FiCheckSquare, FiHome, FiUsers } from 'react-icons/fi';
import { NavButton } from './NavButton';

export const Sidebar = () => (
  <Flex as="section" minH="100vh" bg="transparent">
    <Flex
      flex="1"
      bg="white"
      overflowY="auto"
      boxShadow="sm"
      maxW={{ base: 'full', lg: '17rem' }}
      px={{ base: '6', sm: '6' }}
      py={{ base: '6', sm: '10' }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: '5', sm: '6' }} shouldWrapChildren>
          <HStack spacing="6">
            <Image boxSize="3rem" src="/logo.png" alt="Logo" />
            <Heading fontSize="1.1rem" lineHeight="sm">
              AppConnect Integration Admin
            </Heading>
          </HStack>
          <Stack mt="4" spacing="2">
            <NavButton to="/" label="Home" icon={FiHome} />
            <NavButton to="/teams" label="Teams" icon={FiBarChart2} />
            <NavButton to="/users" label="Users" icon={FiUsers} />
          </Stack>
        </Stack>
      </Stack>
    </Flex>
  </Flex>
);
