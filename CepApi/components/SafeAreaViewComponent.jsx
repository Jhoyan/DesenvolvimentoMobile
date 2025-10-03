import React, { useEffect, useMemo, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity
} from "react-native-web";
import { StyleSheet } from "react-native";
import { getCep } from "./CepApi";

const SafeAreaViewComponent = () => {
    const [cep, setCep] = useState('');
    const [cepError, setCepError] = useState('');
    const [dados, setDados] = useState({});
    const [loading, setLoading] = useState(false);

    async function handleConsultar() {
        if (!cep.trim()) {
            console.warn("Informe um CEP antes de continuar")
            return;
        }
        try {
            setLoading(true);
            setCepError("");
            const dadosCep = await getCep(cep);

            if (dadosCep && !dadosCep.erro) {
                setDados(dadosCep);
            } else {
                setCepError("CEP não encontrado.");
                setDados({});
            }
        } catch (error) {
            console.warn("Erro ao consultar: ", error);
            setCepError("Erro na consulta. Tente novamente.");
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleText}>Consultor de CEP</Text>
            <TextInput value={cep} onChangeText={setCep} placeholder="Digite o CEP aqui..." style={[styles.input, cepError && styles.inputError]} />
            {cepError ? <Text style={[styles.errorText, { marginBottom: 10 }]}>{cepError}</Text> : null}

            <TouchableOpacity onPress={handleConsultar} style={[styles.touchable, { marginBottom: 20, marginTop: 10 }]}>
                <Text style={styles.touchableText}>Consultar</Text>
            </TouchableOpacity>

            {loading && (
                <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 10 }} />
            )}

            <TextInput value={dados.logradouro || ""} placeholder="logradouro" style={[styles.inputNotEditable, dados.logradouro && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.complemento || ""} placeholder="complemento" style={[styles.inputNotEditable, dados.complemento && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.unidade || ""} placeholder="unidade" style={[styles.inputNotEditable, dados.unidade && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.bairro || ""} placeholder="bairro" style={[styles.inputNotEditable, dados.bairro && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.localidade || ""} placeholder="localidade" style={[styles.inputNotEditable, dados.localidade && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.uf || ""} placeholder="uf" style={[styles.inputNotEditable, dados.uf && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.estado || ""} placeholder="estado" style={[styles.inputNotEditable, dados.estado && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.regiao || ""} placeholder="regiao" style={[styles.inputNotEditable, dados.regiao && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.ibge || ""} placeholder="ibge" style={[styles.inputNotEditable, dados.ibge && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.gia || ""} placeholder="gia" style={[styles.inputNotEditable, dados.gia && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.ddd || ""} placeholder="ddd" style={[styles.inputNotEditable, dados.ddd && { borderColor: "#005e10ff" }]} editable={false} />
            <TextInput value={dados.siafi || ""} placeholder="siafi" style={[styles.inputNotEditable, dados.siafi && { borderColor: "#005e10ff" }]} editable={false} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    baseText: {
        fontFamily: 'Cochin',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#ffffffff",
    },
    inputNotEditable: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f5f5f5",
    },
    inputError: {
        borderColor: "#E53E3E",
    },
    touchable: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    }, touchableText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 16
    },
    errorText: {
        color: "#E53E3E",
        fontSize: 12,
        marginTop: 5,
        marginLeft: 5,
    },

})

export default SafeAreaViewComponent;