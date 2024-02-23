//import Stats.css
import "./Stats.css";

const Stats = ({ nameStat, valueStat }) => {
  return (
    <div className="stats">

          <div className="statName">
            <h2>{nameStat}</h2>
          </div>

      <div className="statBar"></div>

          <div className="statValue">
            <h2>{valueStat}</h2>
          </div>


    </div>
  );
};

export default Stats;
