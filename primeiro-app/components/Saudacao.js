import React from "react";
import { Text, View } from "react-native";

function Saudacao(props){
    return(
    <View>
        <Text>Olá, {props.nome}</Text>
    </View>
    )
};

export default Saudacao;