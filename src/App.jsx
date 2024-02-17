import "./App.css";
import { useEffect, useState } from "react";
import Poke from "./Poke"
function App() {
  const [poke, setPoke] = useState([]);
  const [pokemonName, setPokemonName] = useState([]);
  const [searched, setSearched] = useState([]);
  const [img, setImg] = useState(0);
  //const id=0, name="", img="";
  const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";
  const search_url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`

  useEffect(() => {
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

  


  const getPokemonByName = async () => {
    const resp = await fetch(search_url);
    const data = await resp.json();
    const img = data.sprites.front_default;
    console.log(img)
    setImg(img)
    setSearched(data)
  }


  

  const onChange = (e)=>{ 
    setPokemonName(e.target.value)
    console.log(pokemonName)
  }
  const onSubmit = (e)=>{
    e.preventDefault()
    console.log(pokemonName)
    setPokemonName("")
    getPokemonByName()
  }
  

  return (
    <div className="main">
      {/* <img src="assets/pokemon.png" width="200px" /> */}

      
      <div className="container-app">

        {poke.map((poke) => (

          <Poke key={poke.id} id={poke.id} name={poke.name} img={poke.img} ></Poke>

        ))}

      </div>
      <div className="search-box">
        <form onSubmit={(event)=>onSubmit(event)}>
              <input value={pokemonName} type="text" placeholder="Search Pokemon" onChange={ (value)=>onChange(value) }/>
        </form>
        <Poke key={searched.id} id={searched.id} name={searched.name} img={img} ></Poke>
        </div>


    </div>
  );
}

export default App;
