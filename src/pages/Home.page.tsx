import { BookCard } from '@/components/BookCard';
import { useLazyGetBooksQuery } from '@/service/books.service';
import { Box, Grid, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export function HomePage() {
  const [getBooks, { data }] = useLazyGetBooksQuery();
  const [searchString, setSearchString] = useState('list');

  useEffect(() => {
    getBooks({ query: searchString });
  }, [searchString]);

  if (!data) {
    return (
      <Box ta="center">
        <Loader />
      </Box>
    );
  }
  return (
    <>
      {/* TODO type */}
      <Grid gutter={'24px'}>
        {data.items.map((item: any, index: string) => (
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
    </>
  );
}
