import { KeyRound, Mail, Plus, Shield, User, UserCircle } from "lucide-react";
import BigText from "../components/BigText";
import Card from "../components/Card";
import Title from "../components/Title";
import { useAuth } from "../context/useAuth";
import Can from "../components/Can";
import { PERMISSIONS } from "../auth/permissions";
import UsersTable from "../components/UsersTable";
import { useState } from "react";
import NewUser from "../modals/NewUser";

export default function Account() {
  const { user } = useAuth();
  const [reloadUsers, setReloadUsers] = useState(0);
  const [addingUser, setAddingUser] = useState(false);

  function handleUserCreated() {
    setReloadUsers((prev) => prev + 1);
  }

  return (
    <div className="flex flex-col py-6 px-4 gap-8 w-full">
      <div className="flex flex-col gap-1">
        <BigText>Minha Conta</BigText>
        <span className="text-xs font-extralight text-gray-500">
          Gerencie seus dados e configurações
        </span>
      </div>

      <div className="flex gap-8">
        <Card squareSize="w-[50%]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <UserCircle className="size-5" />
                <Title>Dados do Perfil</Title>
              </div>
              <span className="text-xs font-extralight text-gray-500">
                Informações da sua conta
              </span>
            </div>

            <div className="flex gap-4">
              <div className="flex rounded-[50%] bg-green-100 p-4">
                <User className="size-8 text-emerald-700" />
              </div>
              <div className="flex flex-col justify-center">
                <Title>{user?.username}</Title>
                {user?.role == "ADM" ? (
                  <div className="rounded-3xl bg-emerald-700 w-full h-5 items-center flex px-2 gap-1">
                    <Shield className="size-3 text-white" />
                    <span className="text-white text-xs">{user?.profile}</span>
                  </div>
                ) : (
                  <div className="rounded-3xl bg-gray-300 w-full h-5 items-center flex px-2 gap-1">
                    <User className="size-3 text-gray-600" />
                    <span className="text-xs">{user?.profile}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Mail className="size-4" />
                <span className="text-xs">E-mail: </span>
                <span className="text-xs font-semibold">{user?.email}</span>
              </div>
              <div className="flex gap-2">
                <KeyRound className="size-4" />
                <span className="text-xs">Senha: </span>
                <span className="text-xs font-semibold">{"••••••••"}</span>
                <span className="text-xs text-emerald-700 hover:underline cursor-pointer">
                  Alterar
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card squareSize="w-[50%]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Title>Informações do Sistema</Title>
              <span className="text-xs font-extralight text-gray-500">
                Detalhes do acesso
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="text-sm">Id do usuário</span>
                <span className="text-sm text-gray-400">{user?.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Perfil de acesso</span>
                <span className="text-sm text-gray-400">{user?.profile}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Status</span>
                <span className="text-sm text-gray-400">
                  {!user?.active ? (
                    <div className="h-5 w-full border rounded-3xl border-red-400 px-2 text-red-700">
                      Inativo
                    </div>
                  ) : (
                    <div className="h-5 w-full border rounded-3xl border-green-400 px-2 text-green-700">
                      Ativo
                    </div>
                  )}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <Can permission={PERMISSIONS.VIEW_USERS}>
          <Card squareSize="w-[100%]">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  <Title>Gerenciar Usuários</Title>
                  <span className="text-xs font-extralight text-gray-500">
                    Cadastre e visualize os operadores do sistema
                  </span>
                </div>
                <Can permission={PERMISSIONS.CREATE_USER}>
                  <div
                    className="h-10 flex items-center gap-4 px-4 rounded-lg bg-green-700 cursor-pointer"
                    onClick={() => setAddingUser(true)}
                  >
                    <Plus className="size-4 text-white" />
                    <span className="text-white text-sm font-semibold">
                      Novo Usuário
                    </span>
                  </div>
                  {addingUser && (
                    <NewUser
                      onClose={() => setAddingUser(false)}
                      onSuccess={() => {
                        handleUserCreated();
                        setAddingUser(false);
                      }}
                    />
                  )}
                </Can>
              </div>

              <UsersTable reload={reloadUsers} />
            </div>
          </Card>
        </Can>
      </div>
    </div>
  );
}
