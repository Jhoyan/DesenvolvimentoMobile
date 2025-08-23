import React, {useState} from "react";
import { Text, View, TextInput, Button } from "react-native";

function EspelhoDigitacao(){

    const [textoUsu, setTextoUsu] = useState('');

    const mudarTexto = () => {
        setTextoUsu('')
    }

    return(
    <View>        
        <TextInput placeholder="Nada digitado ainda" value={textoUsu} onChangeText={setTextoUsu}></TextInput>
        <Text>Você digitou: {textoUsu}</Text>
        <Button onPress={mudarTexto} title="Limpar"></Button>
    </View>
    )
}

export default EspelhoDigitacao;