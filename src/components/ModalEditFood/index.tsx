import { useContext, useRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import { FoodContext } from '../../contexts/FoodContext';

interface Foods {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  available: boolean;
}

export function ModalEditFood () {
  const {
    editModalOpen,
    toggleEditModal,
    editingFood,
    handleUpdateFood
  } = useContext(FoodContext);

  const formRef = useRef<FormHandles | null>(null)
  

  async function handleSubmit (data: Foods) {
    handleUpdateFood(data);
    toggleEditModal();
  };

    return (
      <Modal isOpen={editModalOpen} setIsOpen={toggleEditModal}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

