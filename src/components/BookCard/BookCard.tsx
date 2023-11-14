import { Button, Card, Group, Image, Text } from '@mantine/core';
import './bookCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '@/store/cart.state';
import { useEffect } from 'react';

interface BookCardInterface {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
}

export function BookCard({ id, title, imageUrl, price }: BookCardInterface) {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart.items); //TODO: appselector

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const handleAddToCart = () => {
    console.log({ id: id, title: title, price: price });
    dispatch(addItem({ product: { id: id, name: title, price: price }, quantity: 1 }));
  };

  return (
    <Card>
      <Card.Section>
        <Image src={imageUrl} height={160} alt={title} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>{title}</Text>
        <Text>{price}</Text>
      </Group>
      {/* when card hovered, make button visible */}
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Card>
  );
}
