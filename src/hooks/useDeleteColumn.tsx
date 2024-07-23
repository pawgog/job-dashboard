import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteColumn } from '../services';
import { ColumnArray } from '../utils/types';

const useDeleteColumn = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteColumn,
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['column'] });
      const previousTasks = queryClient.getQueryData(['column']);
      queryClient.setQueryData(['column'], (previousState: ColumnArray[]) =>
        previousState?.filter((itemArray: ColumnArray) => itemArray._id !== id)
      );

      return { previousTasks };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['column'] });
    }
  });

  return { mutate };
};

export default useDeleteColumn;
