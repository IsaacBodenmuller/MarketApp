import { useEffect, useState } from "react";
import api from "../services/api";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
import PasswordInput from "../components/PasswordInput";
import { X } from "lucide-react";
import BaseModal from "./base/BaseModal";

export default function Customer({ onClose, onSuccess, customer }) {
  const isToUpdate = !!customer;

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (customer) {
      setName(customer.name || "");
      setCpf(customer.cpf || "");
      setPhone(customer.phone || "");
      setEmail(customer.email || "");
      setCep(customer.cep || "");
      setAddress(customer.address || "");
      setAddressNumber(customer.addressNumber || "");
      setComplement(customer.complement || "");
      setNeighborhood(customer.neighborhood || "");
      setCity(customer.city || "");
      setState(customer.state || "");
    }
  }, [customer]);

  const onBlurCep = async (event) => {
    const cep = event.target.value.replace(/\D/g, "");

    if (!cep) return;

    if (cep.length !== 8) {
      setError("O cep não contém 8 dígitos");
      return;
    }
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        return;
      }

      setAddress(data.logradouro || "");
      setCity(data.localidade || "");
      setState(data.estado || "");
      setNeighborhood(data.bairro || "");

      console.log(data);
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        name,
        cpf,
        phone,
        email,
        cep,
        address,
        addressNumber,
        complement,
        neighborhood,
        city,
        state,
      };

      if (isToUpdate) {
        await api.put(`/api/v1/customers/${customer.id}`, payload);

        onSuccess?.({
          ...payload,
          id: customer.id,
        });
      } else {
        const response = await api.post("/api/v1/customers", payload);

        onSuccess?.(response.data);
      }
    } catch (err) {
      console.log(err);
      setError(`Erro ao salvar cliente`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BaseModal onClose={onClose}>
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-semibold">
          {isToUpdate ? "Editar cliente" : "Novo cliente"}
        </h2>
        <X className="size-5 self-center cursor-pointer" onClick={onClose} />
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-100 p-2 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Nome</span>
            <TextInput
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">CPF</span>
            <TextInput
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              isRequired={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Telefone</span>
            <TextInput
              placeholder="Telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">E-mail</span>
            <TextInput
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1 col-span-1">
            <span className="text-xs font-medium">CEP</span>
            <TextInput
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              onBlur={onBlurCep}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <span className="text-xs font-medium">Rua</span>
            <TextInput
              placeholder="Rua"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={true}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Número</span>
            <TextInput
              placeholder="Nº"
              value={addressNumber}
              onChange={(e) => setAddressNumber(e.target.value)}
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <span className="text-xs font-medium">Complemento</span>
            <TextInput
              placeholder="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Bairro</span>
            <TextInput
              placeholder="Bairro"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              disabled={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Cidade</span>
            <TextInput
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Estado</span>
            <TextInput
              placeholder="UF"
              value={state}
              onChange={(e) => setState(e.target.value)}
              disabled={true}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm bg-green-700 text-white rounded-lg cursor-pointer"
          >
            {loading
              ? isToUpdate
                ? "Salvando..."
                : "Criando..."
              : isToUpdate
                ? "Salvar edições"
                : "Criar"}
          </button>
        </div>
      </form>
    </BaseModal>
  );
}
