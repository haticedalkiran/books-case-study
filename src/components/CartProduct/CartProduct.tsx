import { Book } from '@/interfaces/book.interface';
import { CartItem } from '@/interfaces/cartItem.interface';
import { removeItem, updateQuantity } from '@/store/cart.state';
import { Box, Flex, Stack, Text, Title, Group, Image, ActionIcon } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash } from 'tabler-icons-react';

interface CartProductProps {
  item: CartItem;
}
export function CartProduct({ item }: CartProductProps) {
  const dispatch = useDispatch();
  const removeFromCartHandler = () => {
    console.log('removeFromCartHandler');
    dispatch(removeItem(item.id));
  };

  const updateQuantityHandler = (quantity: number) => {
    dispatch(updateQuantity({ productId: item.id, quantity }));
  };
  return (
    <Flex
      wrap="nowrap"
      direction={{ base: 'column', md: 'row' }}
      style={{ border: '1px solid var(--mantine-color-default-border)' }}
    >
      <Box style={{ flex: 1 }}>
        <Image src={item.imageUrl} height={200} alt={item.name} />
      </Box>
      <Stack
        justify="space-between"
        style={{
          flex: 3,
        }}
        py={{ base: 'md', md: 'lg' }}
        px={{ base: 'md', md: 'lg' }}
      >
        <Stack gap="xs">
          <Title order={3}>
            {item.name} - {item.author}
          </Title>
          <Text c="dimmed">{item.publisher}</Text>
        </Stack>

        <Group justify="space-between">
          <Flex gap="sm" align="center">
            <Flex
              justify="center"
              w="max-content"
              align="center"
              style={{
                border: '1px solid var(--mantine-primary-color-filled)',
                borderRadius: '20px',
              }}
              gap="sm"
            >
              <ActionIcon
                radius="20px"
                variant="subtle"
                style={{ lineHeight: 0 }}
                w={'max-content'}
              >
                {item.quantity === 1 ? (
                  <Trash size={16} onClick={removeFromCartHandler} />
                ) : (
                  <Minus size={16} onClick={() => updateQuantityHandler(-1)} />
                )}
              </ActionIcon>
              <Text size="sm" inline>
                {item.quantity}
              </Text>
              <ActionIcon
                radius="20px"
                variant="subtle"
                style={{ lineHeight: 0 }}
                onClick={() => updateQuantityHandler(1)}
              >
                <Plus size={16} strokeWidth={2} />
              </ActionIcon>
            </Flex>
            {item.quantity > 1 && (
              <ActionIcon
                radius="20px"
                variant="subtle"
                style={{ lineHeight: 0 }}
                onClick={removeFromCartHandler}
              >
                <Trash size={16} />
              </ActionIcon>
            )}
          </Flex>
          <Text fw={500}> {(item.price * item.quantity).toFixed(2)} TL</Text>
        </Group>
      </Stack>
    </Flex>
  );
}
