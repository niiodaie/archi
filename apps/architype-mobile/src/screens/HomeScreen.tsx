import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'

const { width } = Dimensions.get('window')

export default function HomeScreen({ navigation }: any) {
  const features = [
    {
      icon: 'camera-outline',
      title: 'AR Planning',
      description: 'Scan and measure spaces with augmented reality',
      color: '#4F46E5',
      screen: 'AR'
    },
    {
      icon: 'folder-outline',
      title: 'Projects',
      description: 'Manage your architectural projects',
      color: '#059669',
      screen: 'Projects'
    },
    {
      icon: 'cube-outline',
      title: '3D Design',
      description: 'Create and view 3D layouts',
      color: '#DC2626',
      screen: 'Design'
    },
    {
      icon: 'people-outline',
      title: 'Collaborate',
      description: 'Work with your team in real-time',
      color: '#7C2D12',
      screen: 'Collaborate'
    }
  ]

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Welcome to VNX-Architype</Text>
          <Text style={styles.heroSubtitle}>
            The all-in-one architectural super-app for professionals and homeowners
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#4F46E5' }]}
              onPress={() => navigation.navigate('AR')}
            >
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.quickActionText}>Start AR Scan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.quickAction, { backgroundColor: '#059669' }]}
              onPress={() => navigation.navigate('Projects')}
            >
              <Ionicons name="add" size={24} color="white" />
              <Text style={styles.quickActionText}>New Project</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={index}
                style={styles.featureCard}
                onPress={() => {
                  if (feature.screen === 'AR' || feature.screen === 'Projects') {
                    navigation.navigate(feature.screen)
                  }
                }}
              >
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <Ionicons name={feature.icon as any} size={24} color="white" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Get Started */}
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.getStartedText}>Sign In to Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  hero: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 15,
  },
  quickAction: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  quickActionText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  featureCard: {
    width: (width - 55) / 2,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: '#4F46E5',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
})

