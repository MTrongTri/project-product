const btnRegister = document.querySelector(".btn-dk");
const inputNameRegister = document.querySelector(".input-name-register");
const inputPassword = document.querySelector(".input-password");
const confirmPassword = document.querySelector(".input-confirm-password");

btnRegister.addEventListener("click", () => {
  if (inputNameRegister.value && inputPassword.value && confirmPassword) {
    alert("Đăng ký thành công");
    window.location.href = "trangdn.html";
  } else {
    alert("Vui lòng nhập đầu đủ thông tin");
  }
});
