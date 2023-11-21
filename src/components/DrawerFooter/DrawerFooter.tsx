import { Button, Flex } from '@mantine/core';
import { useDispatch } from 'react-redux';
import { toggleDrawer } from '@/store/checkout.state';

interface DrawerFooterProps {
  onSave: () => void;
}

export default function DrawerFooter({ onSave }: DrawerFooterProps) {
  const dispatch = useDispatch();

  const onCancelHandler = () => {
    dispatch(toggleDrawer());
  };

  const onSaveHandler = () => {
    onSave();
  };

  return (
    <Flex pos="fixed" bottom="0" py="lg" right="1rem" gap="lg">
      <Button variant="outline" onClick={onCancelHandler}>
        Cancel
      </Button>
      <Button onClick={onSaveHandler}>Save</Button>
    </Flex>
  );
}
