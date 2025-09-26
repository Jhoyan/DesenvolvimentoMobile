import react, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { globalStyles } from '../styles/globalStyles'

export default function InformPessoais() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [cpf, setCpf] = useState('');
    const [celular, setCelular] = useState('');
    const [nomePai, setNomePai] = useState('');
    const [nomeMae, setNomeMae] = useState('');
    const [cep, setCep] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [idade, setIdade] = useState(0);


    const [nomeError, setNomeError] = useState('');
    const [telefoneError, setTelefoneError] = useState('');
    const [dataNascError, setDataNascError] = useState('');
    const [cpfError, setCpfError] = useState('');
    const [celularError, setCelularError] = useState('');
    const [nomePaiError, setNomePaiError] = useState('');
    const [nomeMaeError, setNomeMaeError] = useState('');
    const [cepError, setCepError] = useState('');
    const [enderecoError, setEnderecoError] = useState('');
    const [numeroError, setNumeroError] = useState('');
    const [complementoError, setComplementoError] = useState('');
    const [cidadeError, setCidadeError] = useState('');
    const [estadoError, setEstadoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [senhaError, setSenhaError] = useState('');
    const [confirmarSenhaError, setConfirmarSenhaError] = useState('');

    const validateNome = () => {
        let isValid = true;
        const regex = /^(\w{2,}(\s\w{2,})+)$/

        if (!nome.trim()) {
            setNomeError("O nome é obrigatório");
            isValid = false;
        } else if (!regex.test(nome)) {
            setNomeError("É obrigatório ao menos dois nomes");
            isValid = false;
        } else {
            setNomeError("");
        }
        return isValid;
    }

    const formatarData = (text) => {
        let limpo = text.replace(/\D/g, '');

        if (limpo.length > 2 && limpo.length <= 4) {
            limpo = limpo.slice(0, 2) + '/' + limpo.slice(2); //.slice "corta" a string. Ele começa do primeiro número dentro do parênteses e termina um número antes do segundo número.
        } else if (limpo.length >= 5) {
            limpo = limpo.slice(0, 2) + '/' + limpo.slice(2, 4) + '/' + limpo.slice(4, 8); // Ex: .slice(0, 2) vai começar no index 0 e terminar no index 1, não inclui o último index.
        }
        setDataNasc(limpo);
    }
    const validateDataNasc = () => {
        let isValid = true;

        if (!dataNasc.trim()) {
            setDataNascError("A data de nascimento é obrigatória.");
            isValid = false;
        } else {
            const regex = /^(\d{2}\/\d{2}\/\d{4})$/;

            if (!regex.test(dataNasc)) {
                setDataNascError("Formato inválido. Utilize DD/MM/AAAA.");
                isValid = false;
            } else {
                const [dia, mes, ano] = dataNasc.split("/").map(Number);
                const nascimento = new Date(ano, mes - 1, dia);
                const hoje = new Date();
                const calcIdade = hoje.getFullYear() - nascimento.getFullYear();
                if ((hoje.getMonth() - nascimento.getMonth()) < 0 || (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())) {
                    calcIdade--;
                }

                if (calcIdade < 0 || calcIdade > 120) {
                    setDataNascError("Data de nascimento inválida.")
                    isValid = false;
                } else {                    
                    setDataNascError("");
                }
            }
        }
        return isValid;
    }
    useEffect(() => {
        if (dataNasc.length === 10) {
            const regex = /^(\d{2}\/\d{2}\/\d{4})$/;

            if (regex.test(dataNasc)) {
                const [dia, mes, ano] = dataNasc.split("/").map(Number);
                const nascimento = new Date(ano, mes - 1, dia);
                const hoje = new Date();
                let calcIdade = hoje.getFullYear() - nascimento.getFullYear();

                const mesAtual = hoje.getMonth();
                const diaAtual = hoje.getDate();

                if (mesAtual < mes - 1 || (mesAtual === mes - 1 && diaAtual < dia)) {
                    calcIdade--;
                }

                if (calcIdade >= 0 && calcIdade <= 120) {
                    setIdade(calcIdade);
                }
            }
        }
    }, [dataNasc]);// Executa sempre que dataNasc mudar

    useEffect(() => {
        if (idade >= 18) {
            setNomePai('');
            setNomeMae('');
        }
    }, [idade]); // Executa sempre que idade mudar

    const validateCpf = () => {
        let isValid = true;
        const regex = /^(\d{3}\.\d{3}\.\d{3}-\d{2}|\d{11})$/;

        if (!cpf.trim()) {
            setCpfError("O CPF é obrigatório.");
            isValid = false;
        } else if (!regex.test(cpf)) {
            setCpfError("Formato inválido!");
            isValid = false;
        } else if (!validaCPF(cpf)) {
            setCpfError("CPF inválido!")
            isValid = false;
        } else {
            setCpfError("");
        }
        return isValid;
    }

    function validaCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf == '') return false;
        // Elimina CPFs invalidos conhecidos
        console.log(cpf)
        if (cpf.length != 11 ||
            cpf == "00000000000" ||
            cpf == "11111111111" ||
            cpf == "22222222222" ||
            cpf == "33333333333" ||
            cpf == "44444444444" ||
            cpf == "55555555555" ||
            cpf == "66666666666" ||
            cpf == "77777777777" ||
            cpf == "88888888888" ||
            cpf == "99999999999")
            return false;
        // Valida 1o digito	
        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        // Valida 2o digito	
        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;

        return true;
    }

    const formatarTelefone = (text) => {
        let limpo = text.replace(/\D/g, '').slice(0, 10);

        if (limpo.length === 0) {
            setTelefone('');
            return;
        }

        if (limpo.length <= 2) {
            limpo = `(${limpo}`;
        } else if (limpo.length <= 6) {
            limpo = `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`;
        } else if (limpo.length <= 10) {
            limpo = `(${limpo.slice(0, 2)}) ${limpo.slice(2, 6)}-${limpo.slice(6)}`;
        }
        setTelefone(limpo);
    }
    const formatarCelular = (text) => {
        let limpo = text.replace(/\D/g, '').slice(0, 11);

        if (limpo.length === 0) {
            setCelular('');
            return;
        }

        if (limpo.length <= 2) {
            limpo = `(${limpo}`;
        } else if (limpo.length <= 7) {
            limpo = `(${limpo.slice(0, 2)}) ${limpo.slice(2)}`;
        } else if (limpo.length <= 11) {
            limpo = `(${limpo.slice(0, 2)}) ${limpo.slice(2, 3)} ${limpo.slice(3, 7)}-${limpo.slice(7)}`;
        }
        setCelular(limpo);
    }

    const validateTelephone = () => {
        let isValid = true;
        const regex = /^(\(\d{2}\)\s\d{4}\-\d{4})$/

        if (!telefone.trim()) {
            setTelefoneError("O telefone é obrigatório.")
            isValid = false;
        } else if (!regex.test(telefone)) {
            setTelefoneError("Formato inválido. Utilize (DDD) XXXX-XXXX.");
            isValid = false;
        } else {
            setTelefoneError("");
        }
        return isValid;
    }

    const validateCelular = () => {
        let isValid = true;
        const regex = /^(\(\d{2}\)\s\d{1}\s\d{4}\-\d{4})$/

        if (!celular.trim()) {
            setCelularError("O celular é obrigatório.");
            isValid = false;
        } else if (!regex.test(celular)) {
            setCelularError("Formato inválido. Utilize (DDD) XXXX-XXXX.");
            isValid = false;
        } else {
            setCelularError("");
        }
        return isValid;
    }

    const validateCEP = () => {
        const regex = /^(\d{5}\-\d{3}|\d{8})$/
        let isValid = true;

        if (!cep.trim()) {
            setCepError("O CEP é obrigatório.");
            isValid = false;
        } else if (!regex.test(cep)) {
            setCepError("Formato inválido!");
            isValid = false;
        } else {
            setCepError("");
        }
        return isValid;
    }

    const validateSenha = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/
        let isValid = true;

        if (!senha.trim()) {
            setSenhaError("A senha é obrigatória.");
            isValid = false;
        } else if (!regex.test(senha)) {
            setSenhaError("Senha fraca.")
            isValid = false;
        } else {
            setSenhaError("");
        }
        return isValid;
    }

    const validateConfirmarSenha = () => {
        let isValid = true;

        if (confirmarSenha !== senha)
            isValid = false;

        return isValid;
    }

    const validateEmail = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        let isValid = true;

        if (!email.trim()) {
            setEmailError("O email é obrigatório.");
            isValid = false;
        } else if (!regex.test(email)) {
            setEmailError("Formato inválido.");
            isValid = false;
        } else {
            setEmailError("");
        }
        return isValid;
    }



    const handleSubmit = () => {
        const valid =
            validateNome() &&
            validateDataNasc() &&
            validateCpf() &&
            validateTelephone() &&
            validateCelular() &&
            validateCEP() &&
            validateSenha() &&
            validateEmail() &&
            validateConfirmarSenha();

        if (valid) {
            Alert.alert("Sucesso!!", "Os dados do formulário foram validados corretamente.");
            alert("Sucesso!!", "Os dados do formulário foram validados corretamente.");
        } else {
            Alert.alert("Formulário incompleto.");
            alert("Formulário incompleto.");
        }
    }
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
            >
                <View style={globalStyles.container}>
                    <View style={globalStyles.scrollContent}>
                        <Text style={[globalStyles.title]}>Informações pessoais</Text>
                        <View style={globalStyles.inputContainer}>
                            <TextInput
                                style={[globalStyles.input, nomeError && globalStyles.inputError]}
                                placeholder="Nome completo"
                                value={nome}
                                onChangeText={setNome}
                            ></TextInput>
                            {nomeError ? <Text style={globalStyles.errorText}>{nomeError}</Text> : null}

                            <TextInput
                                style={[globalStyles.input, dataNascError && globalStyles.inputError]}
                                placeholder="Data de Nascimento (DD/MM/AAAA)"
                                value={dataNasc}
                                onChangeText={formatarData}
                                keyboardType="numeric"
                            ></TextInput>
                            {dataNascError ? <Text style={globalStyles.errorText}>{dataNascError}</Text> : null}

                            <TextInput
                                style={[globalStyles.input, cpfError && globalStyles.inputError]}
                                placeholder="CPF"
                                value={cpf}
                                onChangeText={setCpf}
                            ></TextInput>
                            {cpfError ? <Text style={globalStyles.errorText}>{cpfError}</Text> : null}

                            <TextInput
                                style={[globalStyles.input, telefoneError && globalStyles.inputError]}
                                placeholder="Telefone Fixo"
                                value={telefone}
                                onChangeText={formatarTelefone}
                            ></TextInput>
                            {telefoneError ? <Text style={globalStyles.errorText}>{telefoneError}</Text> : null}

                            <TextInput
                                style={[globalStyles.input, celularError && globalStyles.inputError]}
                                placeholder="Celular"
                                value={celular}
                                onChangeText={formatarCelular}
                            ></TextInput>
                            {celularError ? <Text style={globalStyles.errorText}>{celularError}</Text> : null}
                        </View>

                        <Text style={[globalStyles.title]}>Informações Complementares</Text>
                        <View>
                            <TextInput
                                style={[globalStyles.input, nomePaiError && globalStyles.inputError, idade >= 18 && globalStyles.disabledInput]}
                                placeholder="Nome do Pai"
                                value={nomePai}
                                onChangeText={setNomePai}
                                editable={idade < 18}
                            ></TextInput>
                            {nomePaiError ? <Text style={globalStyles.errorText}>{nomePaiError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, nomeMaeError && globalStyles.inputError, idade >= 18 && globalStyles.disabledInput]}
                                placeholder="Nome da mãe"
                                value={nomeMae}
                                onChangeText={setNomeMae}
                                editable={idade < 18}
                            ></TextInput>
                            {nomeMaeError ? <Text style={globalStyles.errorText}>{nomeMaeError}</Text> : null}
                        </View>

                        <Text style={[globalStyles.title]}>Endereço</Text>
                        <View>
                            <TextInput
                                style={[globalStyles.input, cepError && globalStyles.inputError]}
                                placeholder="CEP"
                                value={cep}
                                onChangeText={setCep}
                                keyboardType="numeric"
                            />
                            {cepError ? <Text style={globalStyles.errorText}>{cepError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, enderecoError && globalStyles.inputError]}
                                placeholder="Endereço"
                                value={endereco}
                                onChangeText={setEndereco}
                            />
                            {enderecoError ? <Text style={globalStyles.errorText}>{enderecoError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, numeroError && globalStyles.inputError]}
                                placeholder="Número"
                                value={numero}
                                onChangeText={setNumero}
                                keyboardType="numeric"
                            />
                            {numeroError ? <Text style={globalStyles.errorText}>{numeroError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, complementoError && globalStyles.inputError]}
                                placeholder="Complemento"
                                value={complemento}
                                onChangeText={setComplemento}
                            />
                            {complementoError ? <Text style={globalStyles.errorText}>{complementoError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, cidadeError && globalStyles.inputError]}
                                placeholder="Cidade"
                                value={cidade}
                                onChangeText={setCidade}
                            />
                            {cidadeError ? <Text style={globalStyles.errorText}>{cidadeError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, estadoError && globalStyles.inputError]}
                                placeholder="Estado"
                                value={estado}
                                onChangeText={setEstado}
                            />
                            {estadoError ? <Text style={globalStyles.errorText}>{estadoError}</Text> : null}
                        </View>

                        <Text style={[globalStyles.title]}>Informações da Conta</Text>
                        <View>
                            <TextInput
                                style={[globalStyles.input, emailError && globalStyles.inputError]}
                                placeholder="E-mail"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, senhaError && globalStyles.inputError]}
                                placeholder="Senha"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry={true}
                            />
                            {senhaError ? <Text style={globalStyles.errorText}>{senhaError}</Text> : null}
                        </View>

                        <View>
                            <TextInput
                                style={[globalStyles.input, confirmarSenhaError && globalStyles.inputError]}
                                placeholder="Confirmar Senha"
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                                secureTextEntry={true}
                            />
                            {confirmarSenhaError ? <Text style={globalStyles.errorText}>{confirmarSenhaError}</Text> : null}
                        </View>
                        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
                            <Text style={globalStyles.buttonText}>
                                Enviar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}