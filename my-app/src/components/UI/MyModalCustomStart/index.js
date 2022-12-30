
import React from 'react';
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';

//redux
import { useSelector } from 'react-redux';
import { themeReducerSelector } from '../../../store/reducers/Selectors'
//theme color
import { colorObj } from '../../../const/color_const';





const ModalPoup = ({visible, children}) => {

  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  //selector---------------------------------------------------
  const {themeToggle} = useSelector(s=>themeReducerSelector(s))

  React.useEffect(() => {
    toggleModal();
  }, [visible]);

  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  
  return (
    <Modal transparent visible={showModal}>
      <View style={styles().modalBackGround}>
        <Animated.View
          style={[styles(themeToggle).modalContainer, {transform: [{scale: scaleValue}]}]}>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};



//asstai principal
//================================================================================================
const MyModalCustom = ({visible, setVisible, children }) => {
   //selector---------------------------------------------------
   const {themeToggle} = useSelector(s=>themeReducerSelector(s))

  return (
    <View style={{
        position: 'absolute'
		 }}>
      <ModalPoup visible={visible}>
          <View style={{borderRadius: 10 }}>
            <View style={styles().header}>
                <Text style={{
                    fontFamily: 'RussoOne_400Regular', 
                    fontSize: 12,
                    color:  themeToggle ? colorObj.dark.textColorOne: colorObj.dark.textColorOne,
                  
                  }}>BOXING TIMER</Text>
            </View>
          </View>
 

            {children}


            
      </ModalPoup>
    
    </View>
  );
};

const styles = (props) => StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: props ? colorObj.dark.backgroundColorFirst: colorObj.light.backgroundColorFirst,
    borderRadius: 5,
    elevation: 20,
  },
  header: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: colorObj.dark.backgroundColorSeconds,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  footer: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    bottom: 0,
    width: '100%',
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex:200
  }
});

export default MyModalCustom;