import { Box, Grid, Loader, Stack, Text, TextInput } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookCard } from '@/components/BookCard';
import { Book } from '@/interfaces/book.interface';
import { useLazyGetBooksQuery } from '@/service/books.service';
import { Search } from 'tabler-icons-react';
import LoaderBox from '@/components/Loader/Loader';

export function HomePage() {
  const [getBooks, { data }] = useLazyGetBooksQuery();
  const [searchString, setSearchString] = useState('science-fictions');

  useEffect(() => {
    getBooks({ query: searchString });
  }, [searchString]);

  if (!data) {
    return <LoaderBox />;
  }
  return (
    <Stack>
      <TextInput
        label="Search books"
        placeholder="Search"
        leftSection={<Search size={14} />}
        mb="lg"
        value={searchString}
        onChange={(e) => setSearchString(e.currentTarget.value)}
      />
      <Text fw={500} mb="lg">
        Showing results for: {searchString}
      </Text>
      <Grid gutter="24px">
        {data.items.map((item: Book, index: string) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
            <Link to={`/book/${item.id}`}>
              <BookCard
                id={item.id}
                imageUrl={item.volumeInfo.imageLinks?.thumbnail}
                title={item.volumeInfo.title}
                author={item.volumeInfo.authors}
                price={item.saleInfo?.listPrice?.amount}
                publisher={item.volumeInfo.publisher}
              />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  );
}
