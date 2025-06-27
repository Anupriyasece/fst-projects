#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>

// ✅ Your Wi-Fi credentials
#define WIFI_SSID "Anu's galaxy A23 5G"
#define WIFI_PASSWORD "A23 5G 1C"

// ✅ Your Firebase credentials
#define FIREBASE_HOST "bmsv2-6603e-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "R8hpsXJPGt6YAQdoUkuT6O4iKLg2rs9R7TgNANjw"

// ✅ Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

void setup() {
  Serial.begin(9600);  // UART TX on GPIO1

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi connected");

  // Setup Firebase
  config.host = FIREBASE_HOST;
  config.signer.tokens.legacy_token = FIREBASE_AUTH;

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void loop() {
  // 🟡 Replace these with actual sensor readings
  float voltage = readVoltage();
  float current = readCurrent();
  float temperature = readTemperature();
  float batteryHealth = readBatteryHealth();

  // ✅ Send data to Firebase
  Firebase.setFloat(fbdo, "/bmsData/voltage", voltage);
  Firebase.setFloat(fbdo, "/bmsData/current", current);
  Firebase.setFloat(fbdo, "/bmsData/temperature", temperature);
  Firebase.setFloat(fbdo, "/bmsData/batteryHealth", batteryHealth);

  // ✅ Send same data via UART
  Serial.print("V:"); Serial.print(voltage); Serial.print("V, ");
  Serial.print("I:"); Serial.print(current); Serial.print("A, ");
  Serial.print("T:"); Serial.print(temperature); Serial.print("C, ");
  Serial.print("Health:"); Serial.print(batteryHealth); Serial.println("%");

  delay(5000);  // Send every 5 seconds
}

// ============ Replace these with your actual sensor reading functions ============

float readVoltage() {
  return analogRead(A0) * (3.3 / 1023.0);  // Simple voltage divider example
}

float readCurrent() {
  return 0.0;  // Replace with ACS712 or INA219 sensor logic
}

float readTemperature() {
  return 0.0;  // Replace with DHT or LM35 sensor logic
}

float readBatteryHealth() {
  return 0.0;  // Custom logic or algorithm based on usage
}
