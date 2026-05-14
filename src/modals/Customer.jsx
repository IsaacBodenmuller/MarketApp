import { useEffect, useState } from "react";
import api from "../services/api";
import TextInput from "../components/TextInput";
import SelectInput from "../components/SelectInput";
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

  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStates = async () => {
      try {
        const response = await api.get("/api/v1/state");
        setStates(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const loadCities = async () => {
      cities;
      setCities();
      try {
        const response = await api.get("/api/v1/city");
        setCities(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    loadStates();
    loadCities();
  }, []);

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

  const isValidCpf = (cpf) => {
    cpf = cpf.replace(/\D/g, "");

    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += Number(cpf[i]) * (10 - i);
    }

    let firstDigit = (sum * 10) % 11;
    if (firstDigit === 10) firstDigit = 0;
    if (firstDigit !== Number(cpf[9])) {
      return false;
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += Number(cpf[i]) * (11 - i);
    }

    let secondDigit = (sum * 10) % 11;
    if (secondDigit === 10) secondDigit = 0;
    if (secondDigit !== Number(cpf[10])) {
      return false;
    }

    return true;
  };

  const onBlurCep = async (event) => {
    const cep = event.target.value.replace(/\D/g, "");

    if (!cep) return;

    if (cep.length !== 8) {
      setError("O CEP não contém 8 dígitos");
      return;
    }
    try {
      setError("");

      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setError("CEP não encontrado");
        return;
      }

      setCep(data.cep);
      setAddress(data.logradouro || "");
      setNeighborhood(data.bairro || "");

      const cityResponse = await api.get(`api/v1/city/name/${data.localidade}`);
      const cityData = cityResponse.data;

      setCity(cityData.id || "");
      setState(cityData.stateId || "");

      const citiesResponse = await api.get(
        `/api/v1/city/state/${cityData.stateId}`,
      );
      setCities(citiesResponse.data);
    } catch (error) {
      console.log("Erro ao buscar CEP", error);
    }
  };

  const handleCpfChange = (e) => {
    let cpf = e.target.value.replace(/\D/g, "");

    cpf = cpf.slice(0, 11);

    cpf = cpf
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2");

    setCpf(cpf);

    if (error) {
      setError("");
    }
  };

  const handlePhoneChange = (e) => {
    let phone = e.target.value.replace(/\D/g, "");

    phone = phone.slice(0, 11);

    phone = phone
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");

    setPhone(phone);

    if (error) {
      setError("");
    }
  };

  const handleStateChange = async (id) => {
    try {
      const response = await api.get(`/api/v1/city/state/${id}`);

      setCities(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const cleanCpf = cpf.replace(/\D/g, "");
      if (!isValidCpf(cleanCpf)) {
        setError("CPF inválido");
        return;
      }

      if (!email.includes("@")) {
        setError("O email é inválido");
        return;
      }

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
        await api.put(`/api/v1/customer/${customer.id}`, payload);

        onSuccess({
          ...payload,
          id: customer.id,
        });
      } else {
        await api.post("/api/v1/customer", payload);
        onSuccess(payload);
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
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
              onChange={(e) => handleCpfChange(e)}
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
              onChange={(e) => handlePhoneChange(e)}
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
              isRequired={true}
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
              isRequired={true}
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Estado</span>
            <SelectInput
              value={state}
              options={states}
              onChange={(value) => {
                setState(value);
                handleStateChange(value);
              }}
              placeholder={"Selecione um estado"}
              scroll="true"
            />
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium">Cidade</span>
            <SelectInput
              value={city}
              options={cities}
              onChange={(value) => setCity(value)}
              placeholder={"Selecione uma cidade"}
              scroll="true"
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
