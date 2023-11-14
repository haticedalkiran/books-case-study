import { BookCard } from '@/components/BookCard';
import { useLazyGetBooksQuery } from '@/service/books.service';
import { Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [getBooks, { data }] = useLazyGetBooksQuery();
  const [searchString, setSearchString] = useState('list');
  useEffect(() => {
    getBooks({ query: searchString });
  }, [searchString]);
  return (
    <>
      <Text>Hello World!</Text>
      {/* TODO type */}
      {data &&
        data.items &&
        data.items.map((item: any, index: string) => (
          <BookCard
            key={index}
            imageUrl={item.volumeInfo.imageLinks?.thumbnail}
            title={item.volumeInfo.title}
          />
        ))}
    </>
  );
}
