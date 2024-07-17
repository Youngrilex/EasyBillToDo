import React from 'react';
import { StyleSheet, View } from 'react-native';
import MenuButton from '../components/MenuButton';
import { AntDesign } from '@expo/vector-icons';

export default function DrawerContainer({ navigation }: any) {
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title="LOG OUT"
          source={<AntDesign name="logout" size={24} color="black" />}

          // onPress={() => {
          //   auther()
          //     .signOut()
          //     .then(() => {
          //       dispatch(logout());
          //       navigation.navigate('LoginStack');
          //     }); //logout on redux
          // }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
});
