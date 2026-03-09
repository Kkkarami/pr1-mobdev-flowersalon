import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, ScrollView, TextInput, Modal } from 'react-native';
import React, { useState } from 'react';
import { Button, Switch } from 'react-native';

export default function App() {

  let content;
  let buttonColor = '#f0a2a2';

  const [screen, setScreen] = useState("flowers");
  const [isColorful, setIsColorful] = useState(false);
  const [showQuantity, setShowQuantity] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [detailVisible, setDetailVisible] = useState(false);

  const [flowers, setFlowers] = useState([
    { name: "Троянда червона", price: 80, quantity: 50, description: "Символ любові та пристрасті" },
    { name: "Троянда біла", price: 85, quantity: 40, description: "Чиста та ніжна, для особливих моментів" },
    { name: "Тюльпан жовтий", price: 50, quantity: 60, description: "Яскравий та сонячний, піднімає настрій" },
    { name: "Тюльпан червоний", price: 55, quantity: 45, description: "Стильний і елегантний, класична краса" },
    { name: "Лілія біла", price: 120, quantity: 20, description: "Чистота та невинність, ніжна квітка" },
    { name: "Лілія рожева", price: 125, quantity: 18, description: "Романтична та витончена, ніжний колір" },
    { name: "Орхідея", price: 200, quantity: 15, description: "Екзотична краса для особливих моментів" },
    { name: "Гербера червона", price: 60, quantity: 70, description: "Яскрава квітка для гарного настрою" },
    { name: "Гербера жовта", price: 60, quantity: 65, description: "Весела та сонячна, приносить радість" },
    { name: "Півонія", price: 150, quantity: 25, description: "Розкішна та пишна, символ багатства" },
    { name: "Хризантема біла", price: 45, quantity: 80, description: "Традиційна квітка, символ спокою" },
    { name: "Хризантема жовта", price: 45, quantity: 75, description: "Яскрава та весела, приносить радість" },
    { name: "Гвоздика червона", price: 30, quantity: 90, description: "Символ любові та поваги" },
    { name: "Гвоздика рожева", price: 30, quantity: 85, description: "Ніжна і приємна для подарунків" },
    { name: "Айстра фіолетова", price: 40, quantity: 55, description: "Фіолетова краса, символ вірності" },
    { name: "Ромашка", price: 25, quantity: 100, description: "Проста, весела, символ невинності" },
    { name: "Лаванда", price: 70, quantity: 35, description: "Ароматна, заспокоює та прикрашає" },
    { name: "Гортензія", price: 180, quantity: 12, description: "Велика квітка, символ вдячності" },
    { name: "Еустома", price: 110, quantity: 22, description: "Ніжна та витончена, символ краси" },
    { name: "Аспарагус", price: 140, quantity: 18, description: "Декоративна зелень для букетів" },
  ]);

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [newDescription, setNewDescription] = useState("");

  function changeScreen(targetScreen) {

    if (screen === targetScreen) {
      Alert.alert("Ви вже на цій сторінці");
      return;
    }

    setScreen(targetScreen);
    setModalVisible(false);
  }

  function deleteFlower(name) {

    const filtered = flowers.filter(f => f.name !== name);
    setFlowers(filtered);
  }

  function addFlower() {

    if (!newName || !newPrice || !newQuantity || !newDescription) {
      Alert.alert("Заповніть всі поля");
      return;
    }

    const newFlower = {
      name: newName,
      price: Number(newPrice),
      quantity: Number(newQuantity),
      description: newDescription
    };

    setFlowers([...flowers, newFlower]);

    setNewName("");
    setNewPrice("");
    setNewQuantity("");
    setNewDescription("");

    setScreen("flowers");
  }

  function FlowerItem({ name, price, quantity, description }) {

    return (
      <View style={styles.itemsStyle}>
        <Text
          onPress={() => {
            setSelectedFlower({ name, price, quantity, description });
            setDetailVisible(true);
          }}
        >
          {name}
        </Text>

        <Text>Ціна: {price}</Text>

        {showQuantity && (
          <Text>Кількість: {quantity}</Text>
        )}

        <Button
          title="Видалити"
          color={buttonColor}
          onPress={() => deleteFlower(name)}
        />
      </View>
    );
  }

  if (screen === "flowers") {

    content = (
      <ScrollView>
        <Text style={styles.pageTitle}>Асортимент Квітів</Text>

        {flowers.map(item => (
          <FlowerItem
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            description={item.description}
          />
        ))}

      </ScrollView>
    );
  }

  if (screen === "settings") {

    content = (
      <View>
        <Text style={styles.pageTitle}>Налаштування</Text>

        <View style={{ marginTop: 20 }}>
          <Text>Кольорова тема</Text>
          <Switch
            value={isColorful}
            onValueChange={setIsColorful}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text>Показувати кількість</Text>
          <Switch
            value={showQuantity}
            onValueChange={setShowQuantity}
          />
        </View>

      </View>
    );
  }

  if (screen === "add") {

    content = (
      <View>
        <Text style={styles.pageTitle}>Додати квітку</Text>

        <TextInput
          placeholder="Назва"
          style={styles.input}
          value={newName}
          onChangeText={setNewName}
        />

        <TextInput
          placeholder="Ціна"
          style={styles.input}
          keyboardType="numeric"
          value={newPrice}
          onChangeText={setNewPrice}
        />

        <TextInput
          placeholder="Кількість"
          style={styles.input}
          keyboardType="numeric"
          value={newQuantity}
          onChangeText={setNewQuantity}
        />

        <TextInput
          placeholder="Опис"
          style={styles.input}
          value={newDescription}
          onChangeText={setNewDescription}
        />

        <Button
          title="Додати"
          color={buttonColor}
          onPress={addFlower}
        />
      </View>
    );
  }

  let containerStyle = styles.container;
  let modalContainerStyle = styles.modalContainer;

  if (isColorful) {
    containerStyle = [styles.container, styles.changedTheme];
    modalContainerStyle = [styles.modalContainer, styles.changedTheme];
  }

  return (

    <View style={containerStyle}>
      <StatusBar style="auto" />

      <View style={styles.content}>
        <View style={styles.buttonStyle}>
          <Button
            title="Меню"
            color={buttonColor}
            onPress={() => setModalVisible(true)}
          />
        </View>

        {content}
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={modalContainerStyle}>
          <Text style={styles.pageTitle}>Меню</Text>

          <View style={styles.buttonStyle}>
            <Button
              title="Квіти"
              color={buttonColor}
              onPress={() => changeScreen("flowers")}
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button
              title="Додати"
              color={buttonColor}
              onPress={() => changeScreen("add")}
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button
              title="Налаштування"
              color={buttonColor}
              onPress={() => changeScreen("settings")}
            />
          </View>

          <View style={styles.buttonStyle}>
            <Button
              title="Закрити"
              color={buttonColor}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>

      <Modal visible={detailVisible} animationType="slide">
        <View style={modalContainerStyle}>
          {selectedFlower && (
            <>
              <Text style={styles.pageTitle}>{selectedFlower.name}</Text>
              <Text>Ціна: {selectedFlower.price}</Text>
              <Text>Кількість: {selectedFlower.quantity}</Text>
              <Text>Опис: {selectedFlower.description}</Text>
            </>
          )}

          <Button
            title="Закрити"
            color={buttonColor}
            onPress={() => setDetailVisible(false)}
          />
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    alignContent: "center",
    marginTop: 70,
    marginBottom: 50,
    marginLeft: 20,
    marginRight: 20,
  },

  buttonStyle: {
    marginBottom: 10
  },

  itemsStyle: {
    backgroundColor: '#f5d1d1',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    gap: 5,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    marginTop: 10
  },

  changedTheme: {
    backgroundColor: '#d8a3a3',
  },

  input: {
    borderWidth: 1,
    borderColor: "#999",
    backgroundColor: "#ffffff",
    padding: 10,
    marginBottom: 10
  },

  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff"
  },

});