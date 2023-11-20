import {
  Anchor,
  Box,
  Button,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Notification,
  Stack,
  Tabs,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Alert } from '@/interfaces/alert.interface';
import { IndustryIdentifier } from '@/interfaces/volume.interface';
import { useGetBookDetailsQuery } from '@/service/books.service';
import { addItem } from '@/store/cart.state';

export function BookDetail() {
  const { id } = useParams();
  const { data: bookData } = useGetBookDetailsQuery({ id });
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(
      addItem({
        product: {
          id: bookData.id,
          name: bookData.volumeInfo.title,
          price: bookData.saleInfo.listPrice.amount,
          imageUrl: bookData.volumeInfo.imageLinks?.large,
          author: bookData.volumeInfo.authors,
          publisher: bookData.volumeInfo.publisher,
        },
        quantity: 1,
      })
    );
    const newAlertId = Date.now();

    setAlerts((prevAlerts) => [
      ...prevAlerts,
      { id: newAlertId, message: 'Product added to cart successfully!' },
    ]);

    setTimeout(() => {
      setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== newAlertId));
    }, 3000);
  };

  if (!bookData) {
    return (
      <Box ta="center">
        <Loader />
      </Box>
    );
  }

  return (
    <>
      <Stack gap="md" pos="absolute" right={0} style={{ zIndex: 1 }}>
        {alerts.map((message, index) => (
          <Notification key={index}>{message.message}</Notification>
        ))}
      </Stack>
      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 2, md: 1 }}>
          <Stack gap="lg">
            <Box>
              <Title order={1}>{bookData.volumeInfo.title.toUpperCase()}</Title>
              <Flex>
                {bookData.volumeInfo.authors?.map((author: string, index: string) => (
                  <Text key={index} style={{ color: '#919191' }}>
                    {author.toUpperCase()}
                  </Text>
                ))}
              </Flex>
              <Text>{bookData.volumeInfo.publisher}</Text>
            </Box>

            <Tabs defaultValue="bookDesc">
              <Tabs.List>
                <Tabs.Tab value="bookDesc">Description</Tabs.Tab>
                <Tabs.Tab value="inf">About</Tabs.Tab>
              </Tabs.List>
              <Tabs.Panel value="bookDesc">
                <Stack gap="xs">
                  <TypographyStylesProvider style={{ padding: 0, margin: 0 }}>
                    <Text
                      style={{ padding: 0, margin: 0 }}
                      lineClamp={showFullDescription ? undefined : 8}
                      dangerouslySetInnerHTML={{ __html: bookData.volumeInfo.description }}
                    />
                  </TypographyStylesProvider>
                  <Anchor onClick={() => setShowFullDescription(!showFullDescription)}>
                    {showFullDescription ? 'Show Less' : 'Show More'}
                  </Anchor>
                </Stack>
              </Tabs.Panel>
              <Tabs.Panel value="inf">
                {bookData.volumeInfo.publishedDate && (
                  <Group>
                    <Text fw={700}>Published Date:</Text>
                    <Text>{bookData.volumeInfo.publishedDate}</Text>
                  </Group>
                )}
                {bookData.volumeInfo.industryIdentifiers && (
                  <Group>
                    <Text fw={700}>ISBN:</Text>
                    <Text>
                      {
                        bookData.volumeInfo.industryIdentifiers.find(
                          (item: IndustryIdentifier) => item.type === 'ISBN_13'
                        ).identifier
                      }
                    </Text>
                  </Group>
                )}
                {bookData.volumeInfo.pageCount && (
                  <Group>
                    <Text fw={700}>Page Count:</Text>
                    <Text>{bookData.volumeInfo.pageCount}</Text>
                  </Group>
                )}
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }} order={{ base: 1, md: 2 }}>
          <Stack>
            <Image
              style={{ maxWidth: '100%', maxHeight: '500px' }}
              src={bookData.volumeInfo.imageLinks?.large}
            />
            <Flex justify="space-between" align="center">
              <Text fw={700}>{bookData.saleInfo.listPrice.amount} TL</Text>
              <Button onClick={handleAddToCart}>Add To Cart</Button>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  );
}
