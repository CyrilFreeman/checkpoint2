import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cupcake from "../components/Cupcake";

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [select, setSelect] = useState("");

  useEffect(() => {
    const fetchCupcakes = async () => {
      const response = await fetch("http://localhost:4000/cupcakes");
      const data = await response.json();
      setCupcakes(data);
    };

    fetchCupcakes();
  }, []);

  console.log(cupcakes);
  // Step 3: get all accessories

  useEffect(() => {
    const fetchAccessories = async () => {
      const response = await fetch("http://localhost:4000/accessories");
      const data = await response.json();
      setAccessories(data);
    };

    fetchAccessories();
  }, []);

  console.log(accessories);
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          Filter by{" "}
          <select
            id="cupcake-select"
            value={select}
            onChange={(e) => setSelect(e.target.value)}
          >
            <option value="">---</option>
            {accessories.map((accessorie) => (
              <option value={accessorie.id}>{accessorie.name}</option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        <ul>
          {cupcakes
            .filter((cupcake) => cupcake.accessory_id.includes(select))
            .map((cupcake) => (
              <li key={cupcake.id}>
                {cupcake.id} {cupcake.name}
              </li>
            ))}
        </ul>
        <li className="cupcake-item">
          {cupcakes
            .filter((cupcake) => cupcake.accessory_id.includes(select))
            .map((cupcake) => {
              return (
                <Link to={`/cupcakes/${cupcake.id}`}>
                  <Cupcake cupcake={cupcake} key={cupcake.id} />
                </Link>
              );
            })}
        </li>
      </ul>
    </>
  );
}

export default CupcakeList;