import React, { useState, useEffect } from 'react';
import {Image,View,TouchableHighlight,Text,TextInput} from 'react-native';
import styles from './styles'
import api from '../../services/api'

export default function Home({ navigation }) {
  
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  

  async function login(){
    try {
      await api.post("/usuarios/loginmobile", { 
        email_usuario: email, senha_usuario: senha
      })
        .then(async (res) => {

          if(!email || !senha) {
            alert("Preencha os campos")
          }
          else {
            if(localStorage.getItem("token") !== undefined && localStorage.getItem("user") !== undefined) {
              localStorage.setItem("user", JSON.stringify(res.data.user))
              localStorage.setItem("token", res.data.token)
  
              navigation.navigate("Home")
            }
            navigation.navigate("Vitrine")
          }
          
        })
        .catch((err) => console.log(err.message))
    }
    catch(err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container} >
      <View style={styles.header}>
        <Image source={require('../../img/iconehome.png')} />
        <Text style={styles.text} >Bem vindo a Canteena</Text>
      </View>

      <View style={styles.dados} >
        <TextInput
          style={styles.textoinput}
          onChangeText={(e) => setEmail(e)}
          placeholder="Digite seu E-MAIL"
        />
        <TextInput
          style={styles.textoinput}
          type="password"
          onChangeText={(e) => setSenha(e)}
          secureTextEntry={true}
          placeholder="Digite sua senha"
        />
      </View>
      <View style={styles.botoes} >
        <TouchableHighlight
          style={styles.botoeshome}
          onPress={login}
        >
          <Text style={styles.texto}>ENTRAR</Text>
        </TouchableHighlight>

        {/* <TouchableHighlight
          
          onPress={() => navigation.navigate("Cadastro")}
        >
          <Text style={styles.texto}>CADASTRAR</Text>
        </TouchableHighlight> */}
      </View>
    </View>
  );
}