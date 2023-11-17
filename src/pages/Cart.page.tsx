import { EmptyView } from '@/components/EmptyView/EmptyView';
import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
  Grid,
  Container,
} from '@mantine/core';
import { Plus, Trash } from 'tabler-icons-react';

export function CartPage() {
  const cart = {
    items: [
      {
        id: 'zBTMDwAAQBAJ',
        name: 'The List',
        price: 367.61,
        imageUrl:
          'http://books.google.com/books/content?id=zBTMDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        author: ['Carys Jones'],
        publisher: 'Hachette UK',
        quantity: 1,
      },
      {
        id: 'c54YBwAAQBAJ',
        name: 'The Charm of a List',
        price: 1714.93,
        imageUrl:
          'http://books.google.com/books/content?id=c54YBwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        author: ['Lucie Doležalová'],
        publisher: 'Cambridge Scholars Publishing',
        quantity: 1,
      },
      {
        id: 'T8hEDwAAQBAJ',
        name: 'Make a List',
        price: 735.79,
        imageUrl:
          'http://books.google.com/books/content?id=T8hEDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        author: ['Marilyn McEntyre'],
        publisher: 'Wm. B. Eerdmans Publishing',
        quantity: 1,
      },
    ],
    totalPrice: 2818.33,
  }; //useSelector((state: any) => state.cart); // TODO

  if (!cart.items || cart.items.length === 0) {
    return <EmptyView />;
  }

  return (
    <>
      <Grid gutter={'2rem'} mb={'80px'}>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {cart.items &&
              cart.items.map((item: any, index: number) => (
                <Flex
                  key={index}
                  wrap="nowrap"
                  // style={{
                  //   border: '1px solid #eee', TODO
                  // }}
                  direction={{ base: 'column', md: 'row' }}
                >
                  <Box style={{ flex: 1 }}>
                    <Image src={item.imageUrl} height={200} alt={item.name} />
                  </Box>
                  <Stack
                    justify="space-between"
                    style={{
                      padding: 10,
                      flex: 3,
                    }}
                  >
                    <Stack gap="xs">
                      <Title>
                        {item.name} - {item.author}
                      </Title>
                      <Text>{item.publisher}</Text>
                    </Stack>

                    <Group justify="space-between">
                      <Flex
                        justify="center"
                        w="max-content"
                        align="center"
                        style={{
                          border: '1px solid var(--mantine-primary-color-filled)',
                          borderRadius: '20px',
                        }}
                        gap="10px"
                      >
                        <ActionIcon
                          radius="20px"
                          variant="subtle"
                          style={{ lineHeight: 0 }}
                          w={'max-content'}
                        >
                          <Trash size={16} />
                        </ActionIcon>
                        <Text size="sm" inline>
                          {item.quantity}
                        </Text>
                        <ActionIcon radius="20px" variant="subtle" style={{ lineHeight: 0 }}>
                          <Plus size={16} strokeWidth={2} />
                        </ActionIcon>
                      </Flex>
                      <Text>{item.price * item.quantity} TL</Text>
                    </Group>
                  </Stack>
                </Flex>
              ))}
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }} display={{ base: 'none', md: 'block' }}>
          <Flex
            direction="column"
            style={{ border: '1px solid #eee', padding: '2rem' }}
            gap={'2rem'}
          >
            <Title>Total Price</Title>
            <Title> {cart.totalPrice} TL</Title>
            <Button>Complete Order</Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <Box
        display={{ base: 'block', md: 'none' }}
        pos="fixed"
        left="0"
        bottom="0"
        bg={'var(--mantine-color-body)'}
        w="100%"
        py={'0.5rem'}
        style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
      >
        <Container>
          <Flex justify="space-between" align="center">
            <Stack gap={0}>
              <Text>Total Price</Text>
              <Text> {cart.totalPrice} TL</Text>
            </Stack>
            <Button>Complete Order</Button>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
