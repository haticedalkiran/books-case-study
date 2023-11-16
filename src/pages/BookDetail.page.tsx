import { Header } from '@/components/Header';
import { useGetBookDetailsQuery } from '@/service/books.service';
import {
  Anchor,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Stack,
  Tabs,
  TabsPanel,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

export function BookDetail() {
  const { id } = useParams();
  const { data: bookData } = useGetBookDetailsQuery({ id: id });
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!bookData) {
    return <>loading</>;
  }
  return (
    <Container>
      <Header />
      <Grid>
        <Grid.Col span={6}>
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
                          (item: any) => item.type === 'ISBN_13'
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
        <Grid.Col span={6}>
          <Stack>
            <Image
              style={{ maxWidth: '100%', maxHeight: '500px' }}
              src={bookData.volumeInfo.imageLinks?.large}
            />
            <Flex justify="space-between" align="center">
              <Text fw={700}>{bookData.saleInfo.listPrice.amount} TL</Text>
              <Button>Add To Cart</Button>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
