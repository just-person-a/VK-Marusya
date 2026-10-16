import { useAuthStore } from "@/stores/auth";
import { useNotificationStore } from "@/stores/notification";
import type IRegistrationForm from "@/types/RegistrationForm";
import type IRegistrationError from "@/types/RegistationError";

export const useRegistrationFormSubmit = (form: IRegistrationForm, isRegistrationError: { value: IRegistrationError }) => {
  const auth = useAuthStore();
  const { showNotification } = useNotificationStore();
  let successFlag: boolean = true;

  if (form.email.trim()) {
    isRegistrationError.value.email = false;
  }
  else {
    isRegistrationError.value.email = true;
    successFlag = false;
  };

  if (form.password.trim()) {
    isRegistrationError.value.password = false;
  }
  else {
    isRegistrationError.value.password = true;
    successFlag = false;
  };

  if (form.name.trim()) {
    isRegistrationError.value.name = false;
  }
  else {
    isRegistrationError.value.name = true;
    successFlag = false;
  };

  if (form.surname.trim()) {
    isRegistrationError.value.surname = false;
  }
  else {
    isRegistrationError.value.surname = true;
    successFlag = false;
  };

  if (form.passwordConfirmation.trim()) {
    isRegistrationError.value.passwordConfirmation = false;
  }
  else {
    isRegistrationError.value.passwordConfirmation = true;
    successFlag = false;
  };

  if (form.password.trim() && form.passwordConfirmation.trim()) {
    if (form.password.trim() === form.passwordConfirmation.trim()) {
      isRegistrationError.value.passwordEquality = false;
    }
    else {
      isRegistrationError.value.passwordEquality = true;
      successFlag = false;

      showNotification('Введённые пароли не совпадают. Проверьте корректность данных и повторите попытку!', 'error');
    };
  };

  if (successFlag) {
    auth.register(form.email, form.password, form.name, form.surname);
  };
};
