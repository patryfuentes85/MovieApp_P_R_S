function change_file_name() {
  var pdrs = document.querySelector("#file__input").files[0].name;
  pdrs = pdrs.slice(0, 10) + "...";
  document.querySelector(".label__file__input").innerHTML = pdrs;
  document.querySelector(".label__file__input").style =
    "color: #f9844a";
}
