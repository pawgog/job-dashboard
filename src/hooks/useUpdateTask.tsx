import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services';
import { TasksArray } from '../utils/types';

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onMutate: async (newItems: TasksArray) => {
      const { _id, name } = newItems;

      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (previousState: TasksArray[]) =>
        previousState?.map((itemArray: TasksArray) =>
          itemArray._id === _id ? { ...itemArray, name } : { ...itemArray }
        )
      );

      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    }
  });

  return { mutate };
};

export default useUpdateTask;
