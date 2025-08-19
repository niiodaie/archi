import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Camera } from 'expo-camera'

const { width, height } = Dimensions.get('window')

export default function ARScreen({ navigation }: any) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [measurements, setMeasurements] = useState<any[]>([])

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  const startScan = () => {
    setIsScanning(true)
    // Simulate AR scanning
    setTimeout(() => {
      setIsScanning(false)
      const newMeasurement = {
        id: Date.now(),
        width: Math.floor(Math.random() * 500) + 100,
        height: Math.floor(Math.random() * 300) + 100,
        depth: Math.floor(Math.random() * 400) + 100,
      }
      setMeasurements([...measurements, newMeasurement])
      Alert.alert('Scan Complete', `Room measured: ${newMeasurement.width}cm x ${newMeasurement.height}cm x ${newMeasurement.depth}cm`)
    }, 3000)
  }

  const placeObject = () => {
    Alert.alert('AR Placement', 'This feature will allow you to place 3D objects in AR space')
  }

  const saveSession = () => {
    if (measurements.length === 0) {
      Alert.alert('No Data', 'Please scan some measurements first')
      return
    }
    Alert.alert('Session Saved', 'Your AR session has been saved to the project')
  }

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Ionicons name="camera-off" size={64} color="#6B7280" />
          <Text style={styles.errorTitle}>Camera Access Required</Text>
          <Text style={styles.errorText}>
            Please enable camera access to use AR features
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* AR Viewport Placeholder */}
      <View style={styles.arViewport}>
        <View style={styles.arOverlay}>
          {isScanning && (
            <View style={styles.scanningIndicator}>
              <Ionicons name="scan" size={48} color="white" />
              <Text style={styles.scanningText}>Scanning room...</Text>
            </View>
          )}
          
          {!isScanning && (
            <View style={styles.arInstructions}>
              <Text style={styles.instructionText}>
                Point your camera at the room to start scanning
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <View style={styles.controlRow}>
          <TouchableOpacity
            style={[styles.controlButton, styles.scanButton]}
            onPress={startScan}
            disabled={isScanning}
          >
            <Ionicons name="scan" size={24} color="white" />
            <Text style={styles.controlButtonText}>
              {isScanning ? 'Scanning...' : 'Scan Room'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.placeButton]}
            onPress={placeObject}
          >
            <Ionicons name="cube" size={24} color="white" />
            <Text style={styles.controlButtonText}>Place Object</Text>
          </TouchableOpacity>
        </View>

        {/* Measurements */}
        {measurements.length > 0 && (
          <View style={styles.measurements}>
            <Text style={styles.measurementsTitle}>Measurements</Text>
            {measurements.map((measurement) => (
              <View key={measurement.id} style={styles.measurementItem}>
                <Text style={styles.measurementText}>
                  {measurement.width}cm × {measurement.height}cm × {measurement.depth}cm
                </Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={[styles.controlButton, styles.saveButton]}
          onPress={saveSession}
        >
          <Ionicons name="save" size={24} color="white" />
          <Text style={styles.controlButtonText}>Save Session</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  arViewport: {
    flex: 1,
    backgroundColor: '#1F2937',
    position: 'relative',
  },
  arOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningIndicator: {
    alignItems: 'center',
  },
  scanningText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
  },
  arInstructions: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 20,
    borderRadius: 12,
    margin: 20,
  },
  instructionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  controls: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  controlRow: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 12,
    gap: 8,
  },
  scanButton: {
    backgroundColor: '#4F46E5',
  },
  placeButton: {
    backgroundColor: '#059669',
  },
  saveButton: {
    backgroundColor: '#DC2626',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  measurements: {
    marginBottom: 20,
  },
  measurementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
  },
  measurementItem: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  measurementText: {
    fontSize: 16,
    color: '#374151',
    fontFamily: 'monospace',
  },
})

