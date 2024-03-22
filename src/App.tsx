import React, { useState, useEffect } from "react";
import vyroSquareLogo from "./vyroSquareLogo.svg";
import styles from "./App.module.scss";
import Vehicle from "./components/Vehicle";

import { mockedVehicles } from "./mockedVehicles";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://hasura.vyro.com.au/v1/graphql",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: `
                query GetStockedVehicle {
                  stocked_vehicles(where: { is_listed: { _eq: true } }, limit: 6) {
                    name
                    condition
                    media
                    is_sold
                  }
                }
              `,
            }),
          }
        );
        const data = await response.json();
        setVehicles(data.data.stocked_vehicles);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);
  return (
    <div className={styles.app}>
      <img src={vyroSquareLogo} className={styles.logo} alt="Vyro logo" />
      <h1>Welcome to Vyro</h1>
        {loading ? (
            <div className={styles.loader}></div>
        ) : (
          <div className={styles.grid}>
            {mockedVehicles.map((vehicle, key) => (
              <Vehicle {...vehicle} key={key} />
            ))}
          </div>
        )}
    </div>
  );
}



export default App;
