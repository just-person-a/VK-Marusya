import { useAuthStore } from "@/stores/auth";
import type ILoginForm from "@/types/LoginForm";
import type ILoginError from "@/types/LoginError";

export const useLoginFormSubmit = (form: ILoginForm, isLoginError: { value: ILoginError }) => {
  const auth = useAuthStore();
  let successFlag: boolean = true;

  if (form.email) {
    isLoginError.value.email = false;
  }
  else {
    isLoginError.value.email = true;
    successFlag = false;
  };

  if (form.password) {
    isLoginError.value.password = false;
  }
  else {
    isLoginError.value.password = true;
    successFlag = false;
  };

  if (successFlag) {
    auth.login(form.email, form.password);
  };
};
