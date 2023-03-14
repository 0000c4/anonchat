function create_roomUI(){
    let private_checkbox = document.getElementById("private")
    private_checkbox.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
          document.getElementById("room_password").disabled = false;
          document.getElementById("room_life").disabled = false;
        }
      })
      let timer_checkbox = document.getElementById("room_life")
      timer_checkbox.addEventListener('change', (event) => {
          if (event.currentTarget.checked) {
            document.getElementById("room_timer").disabled = false;
          }
          else{
            document.getElementById("room_timer").value = ''
            document.getElementById("room_timer").disabled = true;
          }
        })
      let public_checkbox = document.getElementById("public")
      public_checkbox.addEventListener('change', (event) => {
          if (event.currentTarget.checked) {
            timer_checkbox.checked = false
            document.getElementById("room_timer").value = '';
            document.getElementById("room_password").value = '';
            document.getElementById("room_password").disabled = true;
            document.getElementById("room_life").disabled = true;
            document.getElementById("room_timer").disabled = true;
          }
        })
    
}
let colorCount = 0;
function changeNameColor(elem) {
    let colors = [
        "Gray",
        "Fuchsia",
        "Purple",
        "Red",
        "Maroon",
        "Olive",
        "Lime",
        "Green",
        "Aqua",
        "Teal",
        "Blue",
        "Navy"]
    colorCount++;
    if(colorCount == colors.length -1){colorCount = 0;}
    elem.style.backgroundColor = colors[colorCount]
}
create_roomUI();
