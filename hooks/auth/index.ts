import { useMutation } from '@tanstack/react-query';
import { register } from '@/lib/api/auth';

const useRegister = (options) => useMutation((data) => register(data), options);

export { useRegister };
