import { Button, Card, Group, Image, Rating, Stack, Text } from '@mantine/core';
import './bookCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/cart.state';
import { useEffect } from 'react';

interface BookCardInterface {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
}

export function BookCard({ id, title, author, imageUrl, price }: BookCardInterface) {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items); //TODO: appselector

  const handleAddToCart = () => {
    dispatch(addItem({ product: { id: id, name: title, price: price }, quantity: 1 }));
  };

  return (
    // TODO:  delete inline style
    <Card>
      <Card.Section>
        <Image src={imageUrl} height={160} alt={title} />
      </Card.Section>
      <Stack h={'100%'} justify="space-between">
        <Stack justify="space-between" mt="md" mb="xs">
          <Text lineClamp={2}>
            {title} - {author}
          </Text>
          <Group align="center">
            {/* TODO Render problem here */}
            <Rating readOnly value={Math.random() * 4.5 + 0.5} />{' '}
            <Text>{Math.floor(Math.random() * 100)}</Text>
          </Group>
          <Text>{price} TL</Text>
        </Stack>

        {/* when card hovered, make button visible */}
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Stack>
    </Card>
  );
}
