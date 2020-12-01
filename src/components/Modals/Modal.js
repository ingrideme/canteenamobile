import React, { useState } from 'react';

import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Fetcher from '../../hooks/Fetcher';
import api from '../../services/api';

const Modal = ({ produto, close }) => {

  const [qtd, setQtd] = useState(1)
  const ingrementeQtd = () => setQtd(qtd + 1)
  const degrementeQtd = () => qtd <= 1 ? setQtd(qtd): setQtd(qtd -1)
  
  const { data } = Fetcher(`produtos.details/${produto}`)

  // Função que alteram a quantidade
  

  // Função que atualiza o produto
  // Ele muda selecionado para true e altera a quantidade
  // Ao mudar selecionado para true, lá no carrinho ele filtra esse produtos
  async function addProductCart(id,qtds) {
    await api.patch(`/produtos/${produto}`, { selecionado: true,quantidade_selecionada: qtds })
      .then((response) => console.log(response.data))
      .catch(err => console.log(err))
  }

  if(!data) return (
    <Text>Carregando...</Text>
  )

  console.log(produto)
  return (
    <View style={ styles.container }>
      <Button title="fechar" onPress={close}/>
      <Image style={styles.img} source={{ uri: data.imagem_txt }}/>
      <Text style={styles.nameProduct}>{data.nome_produto}</Text>

      <View style={styles.containerButton}>
        <Button title="+" onPress={ingrementeQtd}/>
        <TextInput style={styles.input} value={qtd} />
        <Button title="-" onPress={degrementeQtd}/>
      </View>

      <Button onPress={() => addProductCart(data._id,qtd)} title="Adicionar ao carrinho"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
    width: 300,
    height: 300,
    backgroundColor: "#ccc"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  nameProduct: {
    fontSize: 20,
    color: "#000",
    marginVertical: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  containerButton: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginBottom: 20,
    alignItems: "center"
  },
  input: {
    backgroundColor: "#eee",
    height: 35,
    width: 100,
    marginHorizontal: 10,
    paddingHorizontal: 20
  }
});

export default Modal;
