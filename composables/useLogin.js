import { ref } from "vue";
import { MIN_PASSWORD_LENGTH, PASSWORD_REGEX, EMAIL_REGEX } from '@/utils/constants'
import { login, register } from '@/services/loginService'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';

const email = ref("");
const password = ref("");
const emailError = ref("");
const passwordError = ref("");
const reg_name = ref("");
const reg_email = ref("");
const reg_password = ref("");
const reg_nameError = ref("");
const reg_emailError = ref("");
const reg_passwordError = ref("");

export function useLogin() {
  const router = useRouter();

  const validateEmail = () => {
    emailError.value = "";
    let valid = true;

    if (!email.value) {
      emailError.value = "Email is required.";
      valid = false;
    } else if (!EMAIL_REGEX.test(email.value)) {
      emailError.value = "Invalid email format.";
      valid = false;
    }

    return valid;
  };

  const validatePassword = () => {
    passwordError.value = "";
    let valid = true;

    if (!password.value) {
      passwordError.value = "Password is required.";
      valid = false;
    } else if (password.value.length < MIN_PASSWORD_LENGTH) {
      passwordError.value = "Password must be at least 4 characters long.";
      valid = false;
    } else if (!PASSWORD_REGEX.test(password.value)) {
      passwordError.value =
        "Password must contain only English letters and numbers.";
      valid = false;
    }

    return valid;
  };

  const fnLogin = async () => {
    if (validateEmail() && validatePassword()) {
      try {
        const res = await login({
          email: email.value,
          password: password.value
        });

        if (res.status != 401) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login สำเร็จ",
            showConfirmButton: false,
            timer: 1500
          });

          router.push("/admin");
        } else {
          if (res.data.error === "Unauthorized") {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Email หรือ Password ผิดพลาด!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "สำหรับ admin เท่านั้น!",
            });
          }

        }
        
      } catch (error) {
        console.error('Login failed,', error);
      }
    }
  };

  const validateRegName = () => {
    reg_nameError.value = "";
    let valid = true;

    if (!reg_name.value) {
      reg_nameError.value = "Name is required.";
      valid = false;
    }

    return valid;
  };

  const validateRegEmail = () => {
    reg_emailError.value = "";
    let valid = true;

    if (!reg_email.value) {
      reg_emailError.value = "Email is required.";
      valid = false;
    } else if (!EMAIL_REGEX.test(reg_email.value)) {
      reg_emailError.value = "Invalid email format.";
      valid = false;
    }

    return valid;
  };

  const validateRegPassword = () => {
    reg_passwordError.value = "";
    let valid = true;

    if (!reg_password.value) {
      reg_passwordError.value = "Password is required.";
      valid = false;
    } else if (reg_password.value.length < MIN_PASSWORD_LENGTH) {
      reg_passwordError.value = "Password must be at least 4 characters long.";
      valid = false;
    } else if (!PASSWORD_REGEX.test(reg_password.value)) {
      reg_passwordError.value =
        "Password must contain only English letters and numbers.";
      valid = false;
    }

    return valid;
  };

  const fnRegister = async () => {
    if (validateRegName() && validateRegEmail() && validateRegPassword()) {
      const res = await register({
        name: reg_name.value,
        email: reg_email.value,
        password: reg_password.value,
        role: 'Admin'
      });

      if (res) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register สำเร็จ",
          showConfirmButton: false,
          timer: 1500
        });
      }

      const modal = bootstrap.Modal.getInstance(document.getElementById('modal-register'))
      modal.hide()
    }
  }

  return {
    fnLogin,
    fnRegister,
    email,
    emailError,
    password,
    passwordError,
    reg_name,
    reg_email,
    reg_password,
    reg_nameError,
    reg_emailError,
    reg_passwordError,
  };
}
