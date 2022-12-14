import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

export const NavButton = ({ label, to, icon }: NavButtonProps) => {
  const resolved = useResolvedPath(to);
  const match: any = useMatch({ path: resolved.pathname, end: true }) ? 'page' : '';
  const navigate = useNavigate();

  return (
    <Button as="a" href={to} variant="ghost" justifyContent="start" aria-current={match}>
      <HStack spacing="3">
        <Icon as={icon} boxSize="6" color="brand.black" />
        <Text color="brand.black">{label}</Text>
      </HStack>
    </Button>
  );
};

interface NavButtonProps {
  label: string;
  to: string;
  icon: React.ElementType;
}
