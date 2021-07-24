import style from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";


const AvailableMeals = () => {
  const [meals, setmeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadMeals = [];

  const loadDataHandler = async () => {
    const response = await fetch(
      "https://food-app-adac7-default-rtdb.firebaseio.com/meals.json"
    );
    console.log(response);
   

    const data = await response.json();
    if (data === null) {
      throw new Error("Something went wrong!!!");
    }
    for (const key in data) {
      const meal = {
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description,
      };
      loadMeals.push(meal);
    }

    console.log(loadMeals);

    setmeals(loadMeals);
    setIsLoading(false);
  };

  useEffect(() => {
    loadDataHandler().catch((err) => {
      console.log(err)
      setIsLoading(false);
      setError(err.message);
    });
  }, []);

  return (
    <section className={style.meals}>
      <Card>
        {!isLoading && error!==null && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
        {!isLoading && !error && (
          <ul>
            {meals.map((meal) => {
              return <MealItem key={meal.id} meal={meal} id={meal.id} />;
            })}
          </ul>
        )}
      </Card>
      
    </section>
  );
};

export default AvailableMeals;
