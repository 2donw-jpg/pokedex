import React from 'react';
import {Modal, View, Text, StyleSheet } from 'react-native';
import { router, Link } from 'expo-router';
import Pokemon from '@/types/Pokemon';

interface Props {
  isVisible: boolean;
  pokemon: Pokemon;
  onClose: () => void;
}

export default function PokemonModal({isVisible, pokemon, onClose} : Props){
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View>
        <Text>Hello</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
