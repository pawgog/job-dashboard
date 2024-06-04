import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateColumn } from '../services';
import { ColumnArray } from '../utils/types';

type Props = {
  columnId: string;
  newColumn: ColumnArray | undefined;
};

const useUpdateColumn = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateColumn,
    onMutate: async ({ columnId, newColumn }: Props) => {
      await queryClient.cancelQueries({ queryKey: ['column'] });
      const previousColumn = queryClient.getQueryData(['column']);
      queryClient.setQueryData(['column'], (previousState: ColumnArray[]) =>
        previousState?.map((itemArray: ColumnArray) =>
          itemArray._id === newColumn?._id ? { ...newColumn } : { ...itemArray }
        )
      );

      return {
        data: {
          newColumn: previousColumn,
          id: columnId
        }
      };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['column'] });
    }
  });

  return { mutate };
};

export default useUpdateColumn;
