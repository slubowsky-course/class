import { useNavigate } from 'react-router';

export default function RecipeList(props) {
  const { recipes } = props;

  const recipesJsx = recipes?.map(r => <option key={r.id} value={r.id}>{r.name}</option>);

  const navigate = useNavigate();
  const handleSelectRecipe = e => {
    navigate(`/${e.target.value}`);
  };

  return (
    <select id="recipes" onChange={handleSelectRecipe} >
      <option hidden>select a recipe</option>
      {recipesJsx}
    </select>
  );
}
