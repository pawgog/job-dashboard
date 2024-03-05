import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../services';
import { ItemsArray } from '../utils/types';

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask: ItemsArray) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['tasks'], (items: ItemsArray[]) => [...items, newTask]);
    },
    onSuccess: () => {
      queryClient.setQueryData(['tasks'], (items: ItemsArray[]) => {
        return items;
      });
    }
  });

  return { mutate };
};

export default useCreateTask;
