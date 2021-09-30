import { FoodContainer } from "../../components/FoodContainer";
import { Header } from "../../components/Header";
import { ModalAddFood } from "../../components/ModalAddFood";
import { ModalEditFood } from "../../components/ModalEditFood";
import { FoodProvider } from "../../contexts/FoodContext";

export function Dashboard() {
    return (
        <FoodProvider>
          <Header />
          <ModalAddFood />
          <ModalEditFood />

          <FoodContainer />

          
      </FoodProvider>
    );
}