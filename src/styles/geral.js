
import medidas from './medidas';
import cores from './cores';
import fontes from './fontes';

const geral = {
  container: {
    flex: 1,
    backgroundColor: cores.background,
  },
  header: {
    flex: 0.5,
    display: 'flex',
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  telalogin: {
    marginLeft: "5%",
    marginRight: "5%",

  },
  text: {
    fontSize: 29,
    color: "black",
  },
  
  botoeshome: {
    fontSize: 35,
    color: "black",
    width: "80%",
  }

};

export default geral;


/*
 general.js: O arquivo general é o único diferente dos demais.
  Seu papel não é armazenar variáveis, mas sim armazenar estilos de componentes padrão.
   Pense que em seu aplicativo você possui um layout de seção que aplica um espaçamento
    e possui um título em negrito.
 */
/*
Ao invés de criar um componente chamado Section você apenas importa os estilos do general.js
 no seu arquivo styles.js e sai usando as propriedades section e secionTitle.
 A importação pode ser realizada da seguinte forma:

 import { StyleSheet } from 'react-native';
import { general } from 'styles';
const styles = StyleSheet.create({
  ...general,
});
export default styles;
*/