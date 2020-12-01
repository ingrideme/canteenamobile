import React, { useState } from 'react';
import { View, FlatList, Text, Button, Image, StyleSheet } from 'react-native';
import Fetcher from '../../hooks/Fetcher'
import Modal from '../../components/Modals/Modal'


export default function Vitrine({ navigation }) {
  const [isActiveModal, setActiveModal] = useState(false)
  const [productId, setProductId] = useState("")
  const [qtdseleceionada, setqtdseleceionada] = useState(0)


  const { data: bebidas } = Fetcher("/filtro?tipo_produto=1")
  const { data: doces } = Fetcher("/filtro?tipo_produto=2")
  const { data: salgados } = Fetcher("/filtro?tipo_produto=3")

  function handleOpenModal(id,qtd) {
    setProductId(id)
    setActiveModal(true)
    setqtdseleceionada(qtd)
  }

  if (!bebidas || !salgados || !doces) return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Carregando...</Text>
    </View>
  )

  return (
    <>
      <View>
        <Button title="Carrinho" onPress={() => navigation.navigate("Carrinho")} />
        <View>
          <Text>Bebidas</Text>
          <FlatList
            data={bebidas}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10 }}>
                <Image style={styles.img} source={{ uri: item.imagem_txt }} />
                <Text style={styles.nameProduct}>{item.nome_produto}</Text>
                <Text style={styles.nameProduct}>R${item.preco_produto.toFixed(2)}</Text>
                <Text style={styles.nameProduct}>qtd selecionada{item.quantidade_selecionada}</Text>
                <Button title="Comprar" onPress={() => handleOpenModal(item._id,item.quantidade_selecionada)} />
              </View>
            )}
          />
        </View>

        <View><Text>Salgados</Text>
          <FlatList
            data={salgados}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10 }}>
                <Image style={styles.img} source={{ uri: item.imagem_txt }} />
                <Text style={styles.nameProduct}>{item.nome_produto}</Text>
                <Text style={styles.nameProduct}>R${item.preco_produto.toFixed(2)}</Text>
                <Text style={styles.nameProduct}>qtd selecionada{item.quantidade_selecionada}</Text>
                <Button title="Comprar" onPress={() => handleOpenModal(item._id,item.quantidade_selecionada)} />
              </View>
            )}
          />
        </View>


        <View><Text>Doces</Text>
        <FlatList
            data={doces}
            horizontal
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <View style={{ marginHorizontal: 10 }}>
                <Image style={styles.img} source={{ uri: item.imagem_txt }} />
                <Text style={styles.nameProduct}>{item.nome_produto}</Text>
                <Text style={styles.nameProduct}>R${item.preco_produto.toFixed(2)}</Text>
                <Text style={styles.nameProduct}>qtd selecionada{item.quantidade_selecionada}</Text>
                <Button title="Comprar" onPress={() => handleOpenModal(item._id,item.quantidade_selecionada)} />
              </View>
            )}
          />
        </View>
      </View>



      {isActiveModal && (
        <Modal
          produto={productId}
          close={() => setActiveModal(false)}
        />
      )}
    </>
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