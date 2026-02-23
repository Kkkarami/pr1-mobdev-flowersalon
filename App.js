import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native';

export default function App() {
  let content;
  let buttonColor = '#f0a2a2';
  const [screen, setScreen] = useState("flowers");
  const [isColorful, setIsColorful] = useState(false);
  const flowers = [
    { name: "Троянда червона", price: 80, quantity: 50 },
    { name: "Троянда біла", price: 85, quantity: 40 },
    { name: "Тюльпан жовтий", price: 50, quantity: 60 },
    { name: "Тюльпан червоний", price: 55, quantity: 45 },
    { name: "Лілія біла", price: 120, quantity: 20 },
    { name: "Лілія рожева", price: 125, quantity: 18 },
    { name: "Орхідея", price: 200, quantity: 15 },
    { name: "Гербера червона", price: 60, quantity: 70 },
    { name: "Гербера жовта", price: 60, quantity: 65 },
    { name: "Півонія", price: 150, quantity: 25 },
    { name: "Хризантема біла", price: 45, quantity: 80 },
    { name: "Хризантема жовта", price: 45, quantity: 75 },
    { name: "Гвоздика червона", price: 30, quantity: 90 },
    { name: "Гвоздика рожева", price: 30, quantity: 85 },
    { name: "Айстра фіолетова", price: 40, quantity: 55 },
    { name: "Ромашка", price: 25, quantity: 100 },
    { name: "Лаванда", price: 70, quantity: 35 },
    { name: "Гортензія", price: 180, quantity: 12 },
    { name: "Еустома", price: 110, quantity: 22 },
    { name: "Аспарагус", price: 140, quantity: 18 },
  ];

  function FlowerItem({ name, price, quantity }) {
    return (
      <View style={styles.itemsStyle}>
        <Text>{name}</Text>
        <Text>Ціна: {price}</Text>
        <Text>Кількість: {quantity}</Text>
      </View>
    );
  }

  if (screen === "flowers"){
    content = (
      <ScrollView>
        <Text style={styles.pageTitle}>Асортимент Квітів</Text>
        {flowers.map(item => (
          <FlowerItem
            key={item.name}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
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
        <Button
          title={isColorful ? "Вимкнути" : "Увімкнути"}
          onPress={() => setIsColorful(!isColorful)}
        />
      </View>
    </View>
    );
  }

  let containerStyle = styles.container;
  if (isColorful) {
    containerStyle = [styles.container, styles.changedTheme];
  }

  return (
    <View style={containerStyle}>
      <StatusBar style="auto" />
      <View style={styles.content}>
        {content}
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonStyle}>
          <Button title={screen === "flowers" ? "[ Квіти ]" : "Квіти"} color={buttonColor} onPress={() => {
            if (screen === "flowers") {
              Alert.alert("Ви вже на сторінці квітів!")
            } else {setScreen("flowers")}
          }}/>
        </View>
        <View style={styles.buttonStyle}>
          <Button title={screen === "settings" ? "[ Налаштування ]" : "Налаштування"} color={buttonColor} onPress={() => {
            if (screen === "settings") {
              Alert.alert("Ви вже на сторінці налаштуваннь!")
            } else {setScreen("settings")}
          }}/>
        </View>
      </View>
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
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  buttons: {
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    marginBottom: 70,
    marginLeft: 10,
  },
  buttonStyle: {
    flex: 1,
    marginRight: 10,
  },
  itemsStyle: {
    backgroundColor: '#f5d1d1',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },

  changedTheme: {
    backgroundColor: '#d8a3a3', 
  },
});