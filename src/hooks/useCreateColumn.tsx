import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createColumn } from '../services';
import { ColumnArray, NewColumn } from '../utils/types';

const useCreateColumn = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createColumn,
    onMutate: async (newColumn: NewColumn) => {
      await queryClient.cancelQueries({ queryKey: ['column'] });
      queryClient.setQueryData(['column'], (items: ColumnArray[]) => [...items, newColumn]);
    },
    onSuccess: () => {
      queryClient.setQueryData(['column'], (items: ColumnArray[]) => {
        return items;
      });
    }
  });

  return { mutate };
};

export default useCreateColumn;
