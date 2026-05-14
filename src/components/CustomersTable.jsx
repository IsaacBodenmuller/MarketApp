import { useEffect, useState } from "react";
import api from "../services/api";
import { Pencil, Trash } from "lucide-react";
import Message from "../modals/Message";
import Table from "../components/Table";
import Profile from "../modals/Profile";

export default function CustomersTable({ reload, showToast }) {
  const [customers, setCustomers] = useState([]);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const response = await api.get("/api/v1/customer");
        setCustomers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar clientes", error);
      }
    };

    loadCustomers();
  }, [reload]);

  async function deleteCustomer() {
    try {
      await api.delete(`/api/v1/customer/${customerToDelete}`);

      setCustomers((prev) => prev.filter((p) => p.id !== customerToDelete));

      showToast({
        type: "success",
        message: "Cliente excluído com sucesso",
      });
    } catch (error) {
      console.error("Erro ao excluir cliente", error);

      showToast({
        type: "error",
        message: "Erro ao excluir cliente",
      });
    } finally {
      setShowMessage(false);
      setCustomerToDelete(null);
    }
  }

  const columns = [
    { key: "name", label: "Nome cliente" },
    { key: "cpf", label: "CPF" },
    { key: "phone", label: "Telefone" },
    { key: "email", label: "E-mail" },
    { key: "cep", label: "CEP" },
    { key: "address", label: "Rua" },
    { key: "addressNumber", label: "Número" },
    { key: "complement", label: "Complemento" },
    { key: "neighborhood", label: "Bairro" },
    { key: "city", label: "Cidade" },
    { key: "state", label: "Estado" },
    {
      key: "active",
      label: "Status",
      render: (customer) => (customer.isActive ? "Ativo" : "Inativo"),
    },
  ];

  const renderActions = (customer) => (
    <>
      <button
        onClick={() => {
          setCustomerToEdit(customer);
          setShowEditModal(true);
        }}
        className="cursor-pointer"
      >
        <Pencil className="size-4 text-gray-600" />
      </button>

      <button
        onClick={() => {
          setCustomerToDelete(customer.id);
          setShowMessage(true);
        }}
        className="cursor-pointer"
      >
        <Trash className="size-4 text-red-600" />
      </button>
    </>
  );

  return (
    <>
      <Table columns={columns} data={customers} renderActions={renderActions} />

      {showMessage && (
        <Message
          onClose={() => {
            setShowMessage(false);
            setCustomerToDelete(null);
          }}
          onSuccess={deleteCustomer}
        />
      )}

      {showEditModal && (
        <Profile
          profile={customerToEdit}
          onClose={() => {
            setCustomerToEdit(null);
            setShowEditModal(false);
          }}
          onSuccess={(updatedCustomer) => {
            setCustomers((prev) =>
              prev.map((u) =>
                u.id === updatedCustomer.id ? { ...u, ...updatedCustomer } : u,
              ),
            );
            showToast({
              type: "success",
              message: "Cliente salvo com sucesso",
            });
            setShowEditModal(false);
            setCustomerToEdit(null);
          }}
        />
      )}
    </>
  );
}
