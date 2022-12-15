import {
  Box,
  Container,
  Stack,
  useBreakpointValue,
  Text,
  Button,
  Divider,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Link,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { useMutation, useQuery } from 'react-query';
import { Popup } from '../components/Popup';
import { IColumn, Table } from '../components/Table';
import { SERVER_STATUS } from '../utils/constants';
import { formatDate } from '../utils/helpers';

export const Teams = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teamName, setTeamName] = useState('');

  const { isLoading, data, refetch } = useQuery('getTeams', () =>
    axios.get('http://localhost:4000/api/v1/teams').then((res) => res.data),
  );

  const { mutate: createTeam, isLoading: isCreateTeamLoading }: { mutate: (name) => void; isLoading: boolean } =
    useMutation((newTeam) => {
      return axios.post('http://localhost:4000/api/v1/teams/' + newTeam).then((res) => {
        refetch();
        onClose();
        return res.data;
      });
    });

  const { mutate: deleteTeam, isLoading: isDeleteTeamLoading }: { mutate: (name) => void; isLoading: boolean } =
    useMutation((team) => {
      return axios.delete('http://localhost:4000/api/v1/teams/' + team).then((res) => {
        refetch();
        return res.data;
      });
    });

  const columns: IColumn[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Status',
        accessor: 'server.status',
        Cell: ({ value }) => {
          switch (value) {
            case SERVER_STATUS.PENDING:
              return <Badge colorScheme="yellow">Pending</Badge>;
            case SERVER_STATUS.RUNNING:
              return <Badge colorScheme="green">Running</Badge>;
            case SERVER_STATUS.STOPPED:
              return <Badge colorScheme="red">Stopped</Badge>;
            default:
              return <Badge colorScheme="gray">Unknown</Badge>;
          }
        },
      },
      {
        Header: 'IP',
        accessor: 'server.ip',
        Cell: ({ value }) => (
          <Link textDecor="underline" isExternal href={`http://${value}`}>
            {value}
          </Link>
        ),
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        Cell: ({ value }) => formatDate(new Date(value)),
      },
      {
        Header: 'Actions',
        accessor: 'id',
        Cell: ({ row }) => (
          <IconButton
            icon={<FiTrash2 fontSize="1.25rem" />}
            variant="ghost"
            aria-label="Delete team"
            onClick={() => {
              deleteTeam(row.original.name);
            }}
          />
        ),
      },
    ],
    [],
  );

  return (
    <Container py={{ base: '4', md: '8' }} px={{ base: '0', md: 8 }}>
      <Box
        bg="white"
        boxShadow={{ base: 'none', md: 'sm' }}
        borderRadius={useBreakpointValue({ base: 'none', md: 'lg' })}
      >
        <Stack spacing="5">
          <Box px={{ base: '4', md: '6' }} pt="5">
            <Stack direction={{ base: 'column', md: 'row' }} justify="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="medium" display="flex">
                Teams
              </Text>
              <Button
                onClick={() => onOpen()}
                bg="brand.darkBlue"
                color="white"
                size="md"
                px="8"
                textTransform="uppercase"
              >
                Create Team
              </Button>
            </Stack>
          </Box>
          <Divider />
          <Box overflowX="auto">
            <Table columns={columns} data={data ?? []} loading={isLoading || isDeleteTeamLoading} />
          </Box>
        </Stack>
      </Box>
      <Popup
        title="Create Team"
        isOpen={isOpen}
        onClose={() => {
          if (isCreateTeamLoading) return;
          onClose();
          setTeamName('');
        }}
        body={
          <FormControl id="name">
            <FormLabel>Team Name</FormLabel>
            <Input onChange={(e) => setTeamName(e.target.value)} value={teamName} />
          </FormControl>
        }
        footer={
          <Button
            onClick={() => {
              createTeam(teamName);
            }}
            bg="brand.darkBlue"
            color="white"
            size="md"
            px="8"
            textTransform="uppercase"
            disabled={isCreateTeamLoading}
            loadingText="Creating..."
            isLoading={isCreateTeamLoading}
          >
            Create
          </Button>
        }
      />
    </Container>
  );
};
