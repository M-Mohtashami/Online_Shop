import { registerServices } from '@/api/services/registerServices';
import { RegisterValues } from '@/interfaces/inretfaces';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';

const useRegister = (options: UseMutationOptions<any, any, any>) => {
  return useMutation({
    ...options,
    mutationKey: ['register'],
    mutationFn: (data: RegisterValues) => registerServices(data),
  });
};

export default useRegister;
