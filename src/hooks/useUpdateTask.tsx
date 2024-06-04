import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services';
import { ItemsArray } from '../utils/types';

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onMutate: async (newItems: ItemsArray[]) => {
      const [item] = newItems;
      const { id, name } = item;

      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (previousState: ItemsArray[]) =>
        previousState?.map((itemArray: ItemsArray) => (itemArray.id === item.id ? { ...item } : { ...itemArray }))
      );

      return {
        data: {
          previousTasks: previousTasks,
          id: id,
          name: name
        }
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return { mutate };
};

export default useUpdateTask;
