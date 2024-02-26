import { useQuery } from '@tanstack/react-query';
import getRecipes from '../api/getRecipes';

type Props = {
  title: string;
};

function List({ title }: Props) {
  const { isPending, error, data } = useQuery({
    queryKey: ['recipes', { title }],
    queryFn: () => getRecipes(title),
  });

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div>
      {data.map((r) => (
        <p>
          {r.id} - {r.title}
        </p>
      ))}
    </div>
  );
}

export default List;
