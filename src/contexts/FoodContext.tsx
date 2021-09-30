import { createContext, ReactNode, useEffect, useState } from "react";
import api from "../services/api";

interface Foods {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
    available: boolean;
}

type FoodProps = Omit<Foods, 'id | available'>

interface FoodContextProps {
    foods: Foods[];
    editingFood: Foods;
    modalOpen: boolean;
    editModalOpen: boolean;
    handleAddFood: (food: FoodProps) => void;
    handleUpdateFood: (food: Foods) => void;
    handleDeleteFood: (id: number) => void;
    toggleModal: () => void;
    toggleEditModal: () => void;
    handleEditFood: (food: Foods) => void;
}

interface FoodProviderProps {
    children: ReactNode;
}

export const FoodContext = createContext<FoodContextProps>({} as FoodContextProps)

export function FoodProvider({ children }: FoodProviderProps) {
    const [ foods, setFoods ] = useState<Foods[]>([]);
    const [ editingFood, setEditingFood ] = useState<Foods>({} as Foods)
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ editModalOpen, setEditModalOpen ] = useState(false);

    useEffect(() => {
        api.get('/foods')
        .then(response => setFoods([...response.data]))
    }, [])
        

    async function handleAddFood(food: FoodProps) {
        try {
            const response = await api.post('/foods', {
                ...food,
                available: true
            });

            setFoods([...foods, response.data])
        } catch (err) {
            console.log(err)
        }
    }

    async function handleUpdateFood(food: Foods) {
        try {
            const foodUpdated = await api.put<Foods>(
                `/foods/${editingFood.id}`,
                { ...editingFood, ...food },
            );

            const foodsUpdated = foods.map(f =>
                f.id !== foodUpdated.data.id ? f : foodUpdated.data
            );

            setFoods(foodsUpdated)
        } catch (err) {
            console.log(err)
        }
    }

    async function handleDeleteFood(id: number) {
        await api.delete(`/foods/${id}`);

        const foodsFiltered = foods.filter(food => food.id !== id);

        setFoods(foodsFiltered);
    }

    function toggleModal() {
        setModalOpen(!modalOpen);
    }

    function toggleEditModal() {
        setEditModalOpen(!editModalOpen);
    }

    function handleEditFood(food: Foods) {
        setEditingFood(food);
        setEditModalOpen(true)
    }

    return (
        <FoodContext.Provider value={{
            foods,
            editingFood,
            modalOpen,
            editModalOpen,
            handleAddFood,
            handleUpdateFood,
            handleDeleteFood,
            toggleModal,
            toggleEditModal,
            handleEditFood
        }}>
            {children}
        </FoodContext.Provider>
    );
}