import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [poke, setPoke] = useState([]);
  //const id=0, name="", img="";
  const url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

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
          img: data.sprites.other.dream_world.front_default
        };
      });

      // const result = await Promise.all(promises);
     
     
      setPoke(await Promise.all(pokemon));
    };

    getPoke();
  }, []);

  return (
    <>
      {/* <img src="assets/pokemon.png" width="200px" /> */}

      <header>Pokemon</header>

     {
     poke.map(poke => {
      return(
        <div key={poke.id} >
          <div className="card">
          <img src={poke.img} width="200px"></img>
          <p>{poke.id}</p>
          <p>{poke.name}</p>
          </div>
        </div>
      )
     })
     
     }
    </>
  );
}

export default App;
