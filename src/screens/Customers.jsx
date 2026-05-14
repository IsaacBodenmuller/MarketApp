import { Plus } from "lucide-react";
import BigText from "../components/BigText";
import Card from "../components/Card";
import Can from "../components/Can";
import { PERMISSIONS } from "../auth/permissions";
import ButtonIcon from "../components/ButtonIcon";
import { useState } from "react";
import ModalCustomer from "../modals/Customer";
import CustomersTable from "../components/CustomersTable";
import Toast from "../modals/Toast";

export default function Customers() {
  const [addingCustomer, setAddingCustomer] = useState(false);
  const [reloadCustomers, setReloadCustomers] = useState(0);
  const [toast, setToast] = useState(null);

  function handleCustomerCreated() {
    setReloadCustomers((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col py-6 px-4 gap-8 w-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-1">
          <BigText>Clientes</BigText>
          <span className="text-xs font-extralight text-gray-500">
            Cadastro de clientes
          </span>
        </div>
        <Can permission={PERMISSIONS.ADD_CUSTOMER}>
          <ButtonIcon
            color="green"
            icon={Plus}
            textColor="text-white"
            children="Novo Cliente"
            onClick={() => setAddingCustomer(true)}
          />
        </Can>

        {addingCustomer && (
          <ModalCustomer
            onSuccess={() => {
              handleCustomerCreated();
              setAddingCustomer(false);
              setToast({
                type: "success",
                message: "Cliente criado com sucesso",
              });
            }}
            onClose={() => {
              setAddingCustomer(false);
            }}
          />
        )}

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>

      {/* vai ter pesquisa do nome ou cpf */}

      <div className="flex gap-8">
        <Card squareSize="w-[100%]">
          <CustomersTable
            reload={reloadCustomers}
            showToast={setToast}
          ></CustomersTable>
        </Card>
      </div>
    </div>
  );
}
