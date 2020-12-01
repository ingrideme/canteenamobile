import React, { useState } from "react";
import { TouchableHighlight, Modal, Text, View, Button, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles'

export default function Perfil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}//uma modal precisa estar dentro da view,
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.Text}>foto </Text>
        <Text style={styles.Text} >email </Text>
        <Text style={styles.Text}>cpf </Text>
        <Text style={styles.Text}>alterar senha </Text>
      </ScrollView>
      <View style={styles.fixToText}>
        <Button style={styles.btncarrinho}
          title="carrinho"
          onPress={() => navigation.navigate('Carrinho')}
        />
        <Button style={styles.btnback}
          title="Botão qualquer"
          onPress={() => navigation.goBack()}
        />
        <Button style={styles.btnback}
          title="Voltar"
          onPress={() => navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
}

