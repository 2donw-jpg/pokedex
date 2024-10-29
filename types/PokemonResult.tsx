import Poke from "./Pokemon"

type PokemonResult = {
   count: number,
   next: null | string,
   previous: null | string, 
   results: Poke[]
}
export default PokemonResult;