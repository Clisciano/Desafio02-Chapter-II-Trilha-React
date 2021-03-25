import { useState, useEffect } from 'react';

import Header from '../../components/Header';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import api from '../../services/api';

import { FoodsContainer } from './styles';

export interface FoodProps {
  id: number,
  name: string,
  description: string,
  price: string,
  available: boolean,
  image: string,
 }

 const Dashboard: React.FC = () => {
  const [ foods, setFoods ] = useState<FoodProps[]>([]);
  const [ editingFood, setEditingFood ] = useState<FoodProps>({} as FoodProps);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ editModalOpen, setEditModalOpen ] = useState(false);
  
  useEffect(() => {
    async function getFoods() {
      const response = await api.get('/foods');

      setFoods(response.data);
    }
    getFoods();
  },[]);

 const handleAddFood = async (food: Omit<FoodProps, 'id' | 'available' >) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

     setFoods((oldState) => [...oldState, response.data] );
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async(food: Omit<FoodProps, 'id' | 'available' >) => {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(food =>
        food.id !== foodUpdated.data.id ? food : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }
   
  const handleDeleteFood = async (id: number) => {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

 const toggleModal = () => {
    return(setModalOpen(!modalOpen));
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food: FoodProps) => {
    setEditingFood(food);
    setEditModalOpen(!editModalOpen);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

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
    </>
  );
}

 export default Dashboard;

  

  

  

  

  

  
 
