import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateColumn } from '../services';
import { ColumnArray } from '../utils/types';

type Props = {
  _id: string;
  name: string;
};

const useUpdateColumn = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateColumn,
    onMutate: async ({ _id, name }: Props) => {
      await queryClient.cancelQueries({ queryKey: ['column', _id] });
      const previousColumn = queryClient.getQueryData(['todos', _id]);
      queryClient.setQueryData(['column'], (previousState: ColumnArray[]) =>
        previousState?.map((itemArray: ColumnArray) =>
          itemArray._id === _id ? { ...itemArray, name } : { ...itemArray }
        )
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
