import { Button, Card, Image, Notification, Stack, Text } from '@mantine/core';
import './bookCard.css';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addItem } from '@/store/cart.state';
import { Alert } from '@/interfaces/alert.interface';

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
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const handleAddToCart = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addItem({
        product: { id, name: title, price, imageUrl, author, publisher },
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

  return (
    <>
      <Stack gap="md" pos="absolute" right={0} style={{ zIndex: 1 }}>
        {alerts.map((message, index) => (
          <Notification key={index}>{message.message}</Notification>
        ))}
      </Stack>

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
              {price.toFixed(2)} TL
            </Text>
          </Stack>

          {/* when card hovered, make button visible */}
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </Stack>
      </Card>
    </>
  );
}
