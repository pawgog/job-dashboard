import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../services';
import { TasksArray } from '../utils/types';

const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTask,
    onMutate: async (newTask: TasksArray) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      queryClient.setQueryData(['tasks'], (items: TasksArray[]) => [...items, newTask]);
    },
    onSuccess: () => {
      queryClient.setQueryData(['tasks'], (items: TasksArray[]) => {
        return items;
      });
    }
  });

  return { mutate };
};

export default useCreateTask;
