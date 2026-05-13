import { Plus } from "lucide-react";
import BigText from "../components/BigText";
import Card from "../components/Card";
import Can from "../components/Can";
import { PERMISSIONS } from "../auth/permissions";
import ButtonIcon from "../components/ButtonIcon";
import { useState } from "react";
import ModalCustomer from "../modals/Customer";
import CustomersTable from "../components/CustomersTable";

export default function Customers() {
  const [addingCustomer, setAddingCustomer] = useState(false);

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
              setAddingCustomer(false);
            }}
            onClose={() => {
              setAddingCustomer(false);
            }}
          />
        )}
      </div>

      {/* vai ter pesquisa do nome ou cpf */}

      <div className="flex gap-8">
        <Card squareSize="w-[100%]">
          <CustomersTable></CustomersTable>
        </Card>
      </div>
    </div>
  );
}
