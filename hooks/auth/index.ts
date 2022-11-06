import { useMutation } from '@tanstack/react-query';
import { modifyUser, register } from '@/lib/api/auth';

const useRegister = (options) => useMutation((data) => register(data), options);
const useModifyUser = (options) =>
  useMutation((params) => {
    return modifyUser(params);
  }, options);

export { useRegister, useModifyUser };
