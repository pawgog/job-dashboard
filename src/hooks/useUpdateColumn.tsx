import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateColumn } from '../services';
import { ColumnArray } from '../utils/types';

type Props = {
  columnId: string;
  newItems: ColumnArray[];
};

const useUpdateColumn = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateColumn,
    onMutate: async ({ columnId, newItems }: Props) => {
      const [item] = newItems;

      await queryClient.cancelQueries({ queryKey: ['column'] });
      const previousColumn = queryClient.getQueryData(['column']);
      queryClient.setQueryData(['column'], (previousState: ColumnArray[]) =>
        previousState?.map((itemArray: ColumnArray) => (itemArray._id === item._id ? { ...item } : { ...itemArray }))
      );

      return { previousColumn };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['column'] });
    }
  });

  return { mutate };
};

export default useUpdateColumn;
