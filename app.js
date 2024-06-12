
    const clearBtn = document.getElementById('clear-btn');

    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault();
        render();
    });
function render(){
  let fullname=document.getElementById("fullname").value;
  let password=document.getElementById("password").value;
  let datee=document.getElementById("datee").value;
  let gender=document.getElementById("gender").value;
  let phone=document.getElementById("phone").value;
  let diseases=document.getElementById("diseases").value;

  let arr=[fullname,password,datee,gender,phone,diseases];
  localStorage.setItem("user data", JSON.stringify(arr));

}
