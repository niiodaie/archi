import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { supabase } from '../lib/supabase'

export default function ProjectsScreen({ navigation }: any) {
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    checkUser()
    loadProjects()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      navigation.navigate('Auth')
      return
    }
    setUser(user)
  }

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select(`
          *,
          orgs!inner(name)
        `)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const onRefresh = () => {
    setRefreshing(true)
    loadProjects()
  }

  const createProject = () => {
    Alert.alert(
      'Create Project',
      'This will open the project creation form',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => {
          // In a real app, this would navigate to a create project screen
          Alert.alert('Coming Soon', 'Project creation will be available in the web app')
        }}
      ]
    )
  }

  const openProject = (project: any) => {
    Alert.alert(
      project.name,
      `Organization: ${project.orgs?.name}\nStatus: ${project.status}\nLast updated: ${new Date(project.updated_at).toLocaleDateString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open in AR', onPress: () => navigation.navigate('AR') },
        { text: 'View Details', onPress: () => {
          Alert.alert('Coming Soon', 'Detailed project view will be available soon')
        }}
      ]
    )
  }

  const renderProject = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.projectCard} onPress={() => openProject(item)}>
      <View style={styles.projectHeader}>
        <Text style={styles.projectName}>{item.name}</Text>
        <View style={[styles.statusBadge, { 
          backgroundColor: item.status === 'active' ? '#10B981' : '#6B7280' 
        }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <Text style={styles.organizationName}>{item.orgs?.name}</Text>
      
      {item.description && (
        <Text style={styles.projectDescription} numberOfLines={2}>
          {item.description}
        </Text>
      )}
      
      <View style={styles.projectFooter}>
        <View style={styles.projectStats}>
          <Ionicons name="calendar-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>
            {new Date(item.updated_at).toLocaleDateString()}
          </Text>
        </View>
        
        <View style={styles.projectStats}>
          <Ionicons name="cash-outline" size={16} color="#6B7280" />
          <Text style={styles.statText}>
            ${item.cost_estimate || 0}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )

  const renderEmpty = () => (
    <View style={styles.emptyState}>
      <Ionicons name="folder-open-outline" size={64} color="#6B7280" />
      <Text style={styles.emptyTitle}>No Projects Yet</Text>
      <Text style={styles.emptyText}>
        Create your first project to get started with VNX-Architype
      </Text>
      <TouchableOpacity style={styles.createButton} onPress={createProject}>
        <Ionicons name="add" size={20} color="white" />
        <Text style={styles.createButtonText}>Create Project</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Projects</Text>
        <TouchableOpacity style={styles.addButton} onPress={createProject}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Projects List */}
      <FlatList
        data={projects}
        renderItem={renderProject}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={!loading ? renderEmpty : null}
        showsVerticalScrollIndicator={false}
      />

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.quickAction}
          onPress={() => navigation.navigate('AR')}
        >
          <Ionicons name="camera" size={24} color="#4F46E5" />
          <Text style={styles.quickActionText}>Start AR Scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addButton: {
    backgroundColor: '#4F46E5',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  projectCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  projectName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 10,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  organizationName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 15,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  projectStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 40,
  },
  createButton: {
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  quickActions: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    padding: 15,
    borderRadius: 12,
    gap: 10,
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4F46E5',
  },
})

