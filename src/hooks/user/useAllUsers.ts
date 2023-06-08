import getAllUsersService from '@/api/services/users/getAllUsersService';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export const useAllUsers = (options: UseQueryOptions) => {
  return useQuery({
    ...options,
    queryKey: ['all_users'],
    queryFn: () => getAllUsersService(),
  });
};
