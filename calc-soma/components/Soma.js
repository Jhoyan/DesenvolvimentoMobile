import React, { useState } from "react";
import {View, Text, TextInput, Button } from "react-native";

function Soma()
{
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [result, setResult] = useState(0);
    
    const somar = () => {
        setResult(num1 + num2);
    }

    return(
        <View>
            <TextInput placeholder="Número 1" value={num1} onChangeText={text => setNum1(Number(text))}/>
            <TextInput placeholder="Número 2" value={num2} onChangeText={text => setNum2(Number(text))}/>

            <Button title="Somar" onPress={somar}></Button>
            <Text>O resultado da soma é: {result}</Text>
        </View>
    )
}

export default Soma;