import "./App.css";
import { useEffect, useState } from "react";
import Poke from "./Poke";
import Stats from "./Stats";
function App() {
  const [poke, setPoke] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [searched, setSearched] = useState('pikachu');
  const [img, setImg] = useState(0);
  const [nameStat, setNameStat] = useState([]);
  //const id=0, name="", img="";
  const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
  

  useEffect(() => {
    {/* Obtener 150 pokemons y con el useEffect solo se ejecuta 1 vez*/}
    const getPoke = async () => {
      const resp = await fetch(url);
      const data = await resp.json();

      const pokemon = data.results.map(async (poke) => {
        const resp = await fetch(poke.url);
        const data = await resp.json();
        return {
          id: data.id,
          name: data.name,
          img: data.sprites.front_default,
        };
      });

      setPoke(await Promise.all(pokemon));
    };

    getPoke();
  }, []);


  {/* Objetener Pokemon por su Nombre */}
  const getPokemonByName = async (name) => {
    try {
      const search_url = `https://pokeapi.co/api/v2/pokemon/${pokemonName !== '' ? pokemonName : name}`;
      const resp = await fetch(search_url);
      const data = await resp.json();
      const img = data.sprites.front_default;
      const nameStat = data.stats;

      setNameStat(nameStat);
      setImg(img);
      setSearched(data);
      
    } catch (error) {

      setImg("");
      console.log(error);
    
    }
  };




  const onChange = (e) => {
    setPokemonName(e.target.value);
  };




  const onSubmit = (e) => {
    e.preventDefault();
    setPokemonName("");
    getPokemonByName();
  };




  

  return (
    <>


      <div className="imagen">
        <img src="../src/assets/pokemon.png"></img>
      </div>




      <div className="main">





            {/* Seccion de Mostrar 150 Pokemons */}
        <div className="container-app">

          {poke.map((poke) => (
          <div key={poke.id}  


          onClick={()=>{            
          getPokemonByName(poke.name)
          } }>
            


          <Poke
              
              id={poke.id}
              name={poke.name}
              img={poke.img}
            
            ></Poke>
            </div>
          ))}

        </div>









        <div className="search-box">


            {/* Seccion de Busqueda */}
          <form onSubmit={(event) => onSubmit(event)}>
            <input
              value={pokemonName}
              type="text"
              placeholder="Search Pokemon"
              onChange={(value) => onChange(value)}
            />
          </form>



          <div>
              {/* Seccion de Pokemon Buscado */}
            {img ? (
              <Poke
                key={searched.id}
                id={searched.id}
                name={searched.name}
                img={img}
              ></Poke>
            ) : (
              <h1>Pokemon {pokemonName} No Encontrado</h1>
            )}
          </div>
          

 


              {/* Seccion de Stats */}
              {nameStat.map((data) => {
               return(
                
                <div  key={data.stat.name+"1"}>
                  {img ? (
                   <Stats nameStat={data.stat.name} valueStat={data.base_stat}> </Stats>
                   ) : (<div></div>)}
                </div>
               )
              })}
              




              {/* FIN Seccion de SEARCH BOX */}
        </div>







              {/* FIN Seccion de main */}
      </div>
    </>
  );
}

export default App;
