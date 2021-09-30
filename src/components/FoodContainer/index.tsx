import { useContext } from "react";
import { FoodContext } from "../../contexts/FoodContext";
import { Food } from "../Food";
import { FoodsContainer } from "./styles";


export function FoodContainer() {
    const {
        foods,
        handleDeleteFood,
        handleEditFood
    } = useContext(FoodContext);
    return (
        <FoodsContainer data-testid="foods-list">
            {foods &&
              foods.map(food => (
                <Food
                  key={food.id}
                  food={food}
                  handleDelete={handleDeleteFood}
                  handleEditFood={handleEditFood}
                />
              ))}
          </FoodsContainer>
    );
}