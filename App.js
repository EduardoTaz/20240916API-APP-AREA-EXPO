import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [direita, setDireita] = useState('');
  const [esquerda, setEsquerda] = useState('');
  const [cima, setCima] = useState('');
  const [baixo, setBaixo] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch( // fetch = se eu terminar isso pode continuar o codigo
        `http://172.16.7.1:9090/area?direita=${direita}&esquerda=${esquerda}&cima=${cima}&baixo=${baixo}`
      );
      const data = await response.json();

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
        placeholder="Lado direito" // texto a ser exibido no input
        value={direita} // valor 
        onChangeText={setDireita}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Lado esquerdo"
        value={esquerda}
        onChangeText={setEsquerda}
      />
            <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Cima"
        value={cima}
        onChangeText={setCima}
      />
            <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Base"
        value={baixo}
        onChangeText={setBaixo}
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