import { PERMISSIONS } from "../auth/permissions";

export default function Profiles() {
  return (
    <div>
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
                <ModalUser
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
    </div>
  );
}
