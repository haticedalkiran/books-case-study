import { Card, Group, Image, Text } from '@mantine/core';

interface BookCardInterface {
  title: string;
  imageUrl: string;
}
export function BookCard({ title, imageUrl }: BookCardInterface) {
  return (
    <Card>
      <Card.Section>
        <Image src={imageUrl} height={160} alt={title} />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs">
        <Text>{title}</Text>
      </Group>
    </Card>
  );
}
