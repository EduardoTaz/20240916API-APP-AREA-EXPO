import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [lado1, setLado1] = useState('');
  const [lado2, setLado2] = useState('');
  const [lado3, setLado3] = useState('');
  const [lado4, setLado4] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch( // fetch = se eu terminar isso pode continuar o codigo
        `http://192.168.0.22:9090/area?lado1=${lado1}&lado2=${lado2}&lado3=${lado3}&lado4=${lado4}` // endereco da api
      );
      const data = await response.json();

      //tratametno de erro 
      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Área do quadrado</Text>

      <TextInput // cria um input
        style={styles.input} // define a classe para estilização
        keyboardType="numeric" // define o tipo de teclado para numerico
        placeholder="Lado 1" // texto a ser exibido no input
        value={lado1} // valor 
        onChangeText={setLado1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 2"
        value={lado2}
        onChangeText={setLado2}
      />
            <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 3"
        value={lado3}
        onChangeText={setLado3}
      />
            <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado 4"
        value={lado4}
        onChangeText={setLado4}
      />

      <Button title="Calcular" onPress={handleCalculate} />

      {result !== null && <Text style={styles.result}>{result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});