import React, { useState } from 'react';
import { View, TouchableHighlight, TextInput, Text } from 'react-native';
import api from '../../services/api'
import styles from './styles'


export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function handleSubmit() {
    const data = {
      nome: nome,
      email: email,
      senha: senha,
    }
    if (nome !== '' && email !== '' && senha !== '' ) {
      const response = await api.post('/usuarios', data);
      alert("Usuário cadastrado com sucesso")
      navigation.navigate('Home')
    }
  }
  return (
    <View >
        <TextInput placeholder="Digite seu nome completo" onChange={e => setNome(e)} />
        <TextInput placeholder="Digite seu e-mail nome@provedor.com" onChange={e => setEmail(e)} />
        <TextInput placeholder="Digite sua senha" onChange={e => setSenha(e)} />
        <View >
          <TouchableHighlight onClick={handleSubmit}>
            <Text>CADASTRAR</Text>
          </TouchableHighlight>
        </View>
    </View>
  )
}