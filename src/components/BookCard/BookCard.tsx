import { Button, Card, Group, Image, Rating, Stack, Text } from '@mantine/core';
import './bookCard.css';
import { useDispatch } from 'react-redux';
import { addItem } from '@/store/cart.state';

interface BookCardInterface {
  id: string;
  title: string;
  author: string[];
  imageUrl?: string;
  price: number;
  publisher: string;
}

export function BookCard({ id, title, author, imageUrl, price, publisher }: BookCardInterface) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItem({
        product: { id, name: title, price, imageUrl, author, publisher },
        quantity: 1,
      })
    );
  };

  return (
    <Card>
      <Card.Section>
        <Image src={imageUrl} height={160} alt={title} />
      </Card.Section>
      <Stack h="100%" justify="space-between">
        <Stack justify="space-between" mt="md" mb="xs">
          <Stack gap="0">
            <Text lineClamp={2} fw={700}>
              {title} - {author}
            </Text>
            <Text c="dimmed">{publisher}</Text>
          </Stack>
          <Text c="green" fw={500}>
            {price} TL
          </Text>
        </Stack>

        {/* when card hovered, make button visible */}
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      </Stack>
    </Card>
  );
}
