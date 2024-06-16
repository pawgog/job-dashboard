import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../services';
import { TasksArray } from '../utils/types';

const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateTask,
    onMutate: async (newItems: TasksArray[]) => {
      const [item] = newItems;
      const { _id, name } = item;

      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData(['tasks']);
      queryClient.setQueryData(['tasks'], (previousState: TasksArray[]) =>
        previousState?.map((itemArray: TasksArray) => (itemArray._id === item._id ? { ...item } : { ...itemArray }))
      );

      return {
        data: {
          previousTasks: previousTasks,
          id: _id,
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
