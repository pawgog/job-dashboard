import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../services';
import { TasksArray } from '../utils/types';

const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteTask,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (previousState: TasksArray[]) =>
        previousState?.filter((itemArray: TasksArray) => itemArray._id !== id)
      );

      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return { mutate };
};

export default useDeleteTask;
