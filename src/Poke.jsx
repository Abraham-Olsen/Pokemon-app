import "./Poke.css";
const Pokemon = (props) => {
  return (
    <>
      <div className="container-poke">
      <h2 className="name">{props.name}</h2>

        <div key={props.id} className="card">
          <img className="img" src={props.img}></img>
          {/* <p>{props.id}</p> */}
        </div>

      </div>
    </>
  );
};

export default Pokemon;
