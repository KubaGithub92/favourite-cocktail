import React, { useEffect, useState } from "react";
import "./Search.scss";

export default function () {
  const [cocktailData, setCocktailData] = useState(null);
  const [cocktailName, setCocktailName] = useState(null);

  const loadCocktailbyName = async () => {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
    );
    const data = await response.json();
    console.log(data);
    setCocktailData(data.drinks);
  };

  const loadCocktails = (e) => {
    e.preventDefault();
    loadCocktailbyName();
    getIngredient();
  };

  const getCocktailName = (e) => {
    // console.log(e.target.value);
    setCocktailName(e.target.value);
  };

  return (
    <>
      <h2>Search for your favourite cocktails</h2>
      <form className="form" method="get" onSubmit={loadCocktails}>
        <input onChange={getCocktailName} />
        <button type="submit">Search</button>
      </form>

      {cocktailData
        ? cocktailData.map((cocktail) => {
            return (
              <>
                <div className="cocktail" key={cocktail.idDrink}>
                  <img
                    className="cocktail__img"
                    src={cocktail.strDrinkThumb}
                    alt="picture of a cocktail"
                  />
                  <div className="cocktail__content">
                    <h3 className="cocktail__content-name">
                      {cocktail.strDrink}
                    </h3>
                    <div className="cocktail__content-category">
                      {cocktail.strAlcoholic} | {cocktail.strCategory}
                    </div>
                    <br />
                    <div className="cocktail__content-desc">
                      {cocktail.strInstructions}
                    </div>
                    <div className="ingredients">
                      <h4>Ingredients:</h4>
                      {}
                    </div>
                  </div>
                </div>
              </>
            );
          })
        : ""}
    </>
  );
}
