import React, { useCallback, useState, useEffect} from 'react';

import { View, Text, StyleSheet, Button, FlatList, Image,TextInput } from 'react-native';
import Fetcher from '../../hooks/Fetcher';
import api from '../../services/api';

const Cart = ({ navigation }) => {
  // Filtrando apenas os produtos com selecionado igual a true
  const { data, mutate } = Fetcher("/filtro/produtos?selecionado=true")
  const [qtd, setQtd] = useState(1)
  const [user, setUser] = useState("")
  const [teste, setTeste] = useState(null)
  const ingrementeQtd = () => setQtd(qtd + 1)
  const degrementeQtd = () => qtd <= 1 ? setQtd(qtd) : setQtd(qtd - 1)

  useEffect(() => {
    async function Teste() {
      await api.get("/filtro/produtos?selecionado=true").then(res => {
        const total = res.data.reduce((sum, value) => sum + (value.preco_produto * value.quantidade_selecionada), 0).toFixed(2)
        setTeste(total)
      })
    }
    Teste()
  }, [])

  useEffect(() => {
    const user = localStorage.getItem("user")
    setUser(JSON.parse(user))
  }, [])
  // Função que remove os items do carrinho
  // Ao mudar o selecionado para false ele não é mais listado no carrinho
  const handleRemoveCart = useCallback((id) => {
    api.patch(`/produtos/${id}`, { qtd: 0, selecionado: false, quantidade_selecionada: 0 })
      .then((res) => console.log(res))
      .catch(err => console.log(err))

    const teste = data?.map((item) => {
      if (item._id === id) {
        return { ...item }
      }

      return item
    })

    mutate(teste, true)
  }, [data, mutate])

  async function Pedido(id, qtds) {
    await api.post(`/pedidos`, { qtdselecionado: qtds, preco_total: teste }, {
      headers: {
        produto_id: id,
        usuario_id: user._id
      }
    })
      .then((response) => console.log(response.data))
      .catch(err => console.log(err))
  }

  if (!data) return (
    <Text>Carregando...</Text>
  )

  return (
    <View style={styles.container}>
      <Button title="fechar" onPress={() => navigation.navigate("Vitrine")} />
      <Text style={styles.title}>Cart</Text>
      <Text style={styles.precoText}>
        Total a pagar: R$
        {teste}
      </Text>
      <Button title="Fechar pedido" onPress={() => {
        data.map(item => Pedido(item._id, item.quantidade_selecionada))
      }} />

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.containerList}>
            <Image style={styles.img} source={{ uri: item.imagem_txt }} />
            <Text style={styles.nameProduct}>{item.nome_produto}</Text>
            <Text style={styles.nameProduct}>valor unitário :{item.preco_produto}</Text>
            <Text style={styles.nameProduct}>quantidade selecionada :{item.quantidade_selecionada}</Text>
            <Button color="red" title="Remover" onPress={() => handleRemoveCart(item._id)} />
            
            <Button title="+" onPress={ingrementeQtd} onClick={() => handleRemoveCart(item._id)} />
            <TextInput style={styles.input} value={qtd} />
            <Button title="-" onPress={degrementeQtd} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  precoText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#fff',
  },
  img: {
    width: 100,
    height: 100,
  },
  containerList: {
    marginHorizontal: 20,
    marginVertical: 20
  },
  nameProduct: {
    fontSize: 20
  },
  textqtd: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default Cart;
