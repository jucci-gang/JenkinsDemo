import { describe, it, expect, vi } from 'vitest';
import { fetchUserProfile } from '../userService';

describe('User Service', () => {
  it('should fetch and transform user data successfully', async () => {
    // ARRANGE - Create a MOCK API client
    const mockApiClient = {
      get: vi.fn().mockResolvedValue({
        data: {
          id: 1,
          name: 'Juan Dela Cruz',
          email: 'juan@example.com',
          status: 'active',
          createdAt: '2024-01-01', // Extra field we don't use
        }
      })
    };

    // ACT
    const result = await fetchUserProfile(1, mockApiClient);

    // ASSERT - Check the result
    expect(result).toEqual({
      id: 1,
      name: 'Juan Dela Cruz',
      email: 'juan@example.com',
      isActive: true
    });

    // ASSERT - Verify the API was called correctly
    expect(mockApiClient.get).toHaveBeenCalledWith('/users/1');
    expect(mockApiClient.get).toHaveBeenCalledTimes(1);
  });

  it('should throw error when user ID is missing', async () => {
    const mockApiClient = { get: vi.fn() };

    // ACT & ASSERT
    await expect(fetchUserProfile(null, mockApiClient))
      .rejects.toThrow('User ID is required');

    // Verify API was NOT called
    expect(mockApiClient.get).not.toHaveBeenCalled();
  });

  it('should handle 404 error correctly', async () => {
    // ARRANGE - Mock a 404 error response
    const mockApiClient = {
      get: vi.fn().mockRejectedValue({
        response: { status: 404 }
      })
    };

    // ACT & ASSERT
    await expect(fetchUserProfile(999, mockApiClient))
      .rejects.toThrow('User not found');
  });

  it('should handle network errors', async () => {
    // ARRANGE - Mock a network error
    const mockApiClient = {
      get: vi.fn().mockRejectedValue(new Error('Network timeout'))
    };

    // ACT & ASSERT
    await expect(fetchUserProfile(1, mockApiClient))
      .rejects.toThrow('Failed to fetch user profile');
  });

  it('should transform inactive users correctly', async () => {
    // ARRANGE
    const mockApiClient = {
      get: vi.fn().mockResolvedValue({
        data: {
          id: 2,
          name: 'Maria Santos',
          email: 'maria@example.com',
          status: 'inactive'
        }
      })
    };

    // ACT
    const result = await fetchUserProfile(2, mockApiClient);

    // ASSERT
    expect(result.isActive).toBe(false);
  });
});