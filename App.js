import React, { useState } from "react";
import { View, Text, Button, TextInput, ScrollView, Alert, StyleSheet } from "react-native";

export default function App() {
  const [attendance, setAttendance] = useState([]);
  const [workingDays, setWorkingDays] = useState(48);
  const [goal, setGoal] = useState(90);

  const markAttendance = (status) => {
    if (attendance.length < workingDays) {
      setAttendance([...attendance, status]);
    }
  };

  const reset = () => {
    Alert.alert("Reset", "Are you sure you want to reset all data?", [
      { text: "Cancel" },
      { text: "Yes", onPress: () => setAttendance([]) },
    ]);
  };

  const present = attendance.filter((d) => d === "present").length;
  const absent = attendance.filter((d) => d === "absent").length;
  const percent = ((present / attendance.length) * 100 || 0).toFixed(1);
  const needed = Math.ceil((goal / 100) * workingDays);
  const stillNeed = Math.max(needed - present, 0);
  const maxSkips = Math.max(workingDays - needed, 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📅 Don't Skip</Text>
      <Text>🎯 Goal (%)</Text>
      <TextInput style={styles.input} keyboardType="number-pad" value={goal.toString()} onChangeText={(text) => setGoal(parseInt(text) || 0)} />
      <Text>📆 Working Days</Text>
      <TextInput style={styles.input} keyboardType="number-pad" value={workingDays.toString()} onChangeText={(text) => setWorkingDays(parseInt(text) || 0)} />
      <Text>Total Tracked: {attendance.length} / {workingDays}</Text>
      <Text>✅ Present: {present}</Text>
      <Text>❌ Absent: {absent}</Text>
      <Text>📊 Attendance: {percent}%</Text>
      <Text>⛔ Max Skips Allowed: {maxSkips}</Text>
      <Text>🧮 Still Need: {stillNeed} more present</Text>
      <Text style={{ color: percent < goal ? "red" : "green", fontWeight: "bold" }}>
        {percent < goal ? "⚠️ Below Goal" : "✅ On Track"}
      </Text>
      <View style={styles.buttons}>
        <Button title="✅ Present" onPress={() => markAttendance("present")} />
        <Button title="❌ Absent" onPress={() => markAttendance("absent")} />
        <Button title="🔄 Reset" onPress={reset} />
      </View>
      <View style={styles.grid}>
        {Array.from({ length: workingDays }).map((_, i) => (
          <Text key={i} style={{ ...styles.day, backgroundColor: attendance[i] === "present" ? "green" : attendance[i] === "absent" ? "red" : "lightgray", color: "white" }}>
            {i + 1}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginVertical: 6 },
  buttons: { marginVertical: 10 },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: 20 },
  day: {
    width: 35,
    height: 35,
    margin: 3,
    textAlign: "center",
    textAlignVertical: "center",
    borderRadius: 20,
    fontWeight: "bold",
  },
});