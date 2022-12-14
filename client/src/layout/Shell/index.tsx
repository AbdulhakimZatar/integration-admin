import { Container, Flex, useBreakpointValue } from '@chakra-ui/react';
import { Navbar } from '../../components/Navbar';
import { Sidebar } from '../../components/Sidebar';

export const Shell = ({ children }: ShellProps) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex as="section" direction={{ base: 'column', lg: 'row' }} height="100vh" overflowY="auto">
      {isDesktop ? <Sidebar /> : <Navbar />}

      <Container py="8" flex="1">
        {children}
      </Container>
    </Flex>
  );
};

interface ShellProps {
  children: React.ReactNode;
}
