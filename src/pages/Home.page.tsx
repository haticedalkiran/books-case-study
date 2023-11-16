import { BookCard } from '@/components/BookCard';
import { Header } from '@/components/Header';
import { useLazyGetBooksQuery } from '@/service/books.service';
import { Container, Grid, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

export function HomePage() {
  const [getBooks, { data }] = useLazyGetBooksQuery();
  const [searchString, setSearchString] = useState('list');

  useEffect(() => {
    getBooks({ query: searchString });
  }, [searchString]);

  return (
    <>
      <Header />
      <Container>
        {/* TODO type */}

        <Grid gutter={'36px'}>
          {data &&
            data.items &&
            data.items.map((item: any, index: string) => (
              <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 3 }}>
                <Link to={`/book/${item.id}`}>
                  <BookCard
                    id={item.id}
                    imageUrl={item.volumeInfo.imageLinks?.thumbnail}
                    title={item.volumeInfo.title}
                    author={item.volumeInfo.authors?.[0]}
                    price={item.saleInfo?.listPrice?.amount}
                  />
                </Link>
              </Grid.Col>
            ))}
        </Grid>
      </Container>
    </>
  );
}
