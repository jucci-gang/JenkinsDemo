export async function fetchUserProfile(userId, apiClient) {
  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    const response = await apiClient.get(`/users/${userId}`);
    
    return {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      isActive: response.data.status === 'active'
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user profile');
  }
}