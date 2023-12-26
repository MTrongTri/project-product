const btnLogin = document.querySelector(".login-btn");
const inputNameLogin = document.querySelector(".input-name-login");
const inputPassword = document.querySelector(".input-password");

btnLogin.addEventListener("click", () => {
  if (inputNameLogin.value && inputPassword.value) {
    alert("Đăng nhập thành công");
    window.location.href = "index.html";
  }
  else {
    alert("Vui lòng nhập đầu đủ tên đăng nhập và mật khẩu");
  }
});
