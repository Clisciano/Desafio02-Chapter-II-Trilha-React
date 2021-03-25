import { useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { FoodProps } from '../../pages/Dashboard';
import Modal from '../Modal';
import Input from '../Input';

import { Form } from './styles';


interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Omit<FoodProps, 'id' | 'available' >) => Promise<void>;
}

const ModalAddFood: React.FC<ModalAddFoodProps> = ({ isOpen, setIsOpen, handleAddFood }) => {
  const formRef = useRef(null);
  
  const handleSubmit = async (food: Omit<FoodProps, 'id' | 'available' >) => {
    
    handleAddFood(food);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  };

export default ModalAddFood;
