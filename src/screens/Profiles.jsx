import Card from "../components/Card";
import Can from "../components/Can";
import { Plus } from "lucide-react";
import BigText from "../components/BigText";
import { useState } from "react";
import Profile from "../modals/Profile";
import ProfilesTable from "../components/ProfilesTable";
import Toast from "../modals/Toast";
import { PERMISSIONS } from "../auth/permissions";
import ButtonIcon from "../components/ButtonIcon";

export default function Profiles() {
  const [reloadProfiles, setReloadProfiles] = useState(0);
  const [addingProfile, setAddingProfile] = useState(false);
  const [toast, setToast] = useState(null);

  function handleProfileCreated() {
    setReloadProfiles((prev) => prev + 1);
  }

  return (
    <div className="px-4 py-6">
      <Card squareSize="w-[100%]">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <BigText>Gerenciar Perfis de Usuário</BigText>
              <span className="text-xs font-extralight text-gray-500">
                Cadastre e visualize os perfis dos operadores do sistema
              </span>
            </div>
            <Can permission={PERMISSIONS.CREATE_PROFILE}>
              <ButtonIcon
                color="green"
                textColor="text-white"
                icon={Plus}
                children="Novo Perfil"
                onClick={() => setAddingProfile(true)}
              />
            </Can>
            {addingProfile && (
              <Profile
                onClose={() => setAddingProfile(false)}
                onSuccess={() => {
                  handleProfileCreated();
                  setAddingProfile(false);
                  setToast({
                    type: "success",
                    message: "Perfil criado com sucesso",
                  });
                }}
              />
            )}
          </div>

          {toast && (
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => setToast(null)}
            />
          )}

          <ProfilesTable reload={reloadProfiles} showToast={setToast} />
        </div>
      </Card>
    </div>
  );
}
