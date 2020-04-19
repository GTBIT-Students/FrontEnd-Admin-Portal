import PNotify from "pnotify/dist/es/PNotify";
PNotify.defaults.styling = "bootstrap4";
PNotify.defaults.icons = "fontawesome5";
PNotify.defaults.delay = 5000;

export default (text = "Something Went Wrong.Try again!", type = "error") => {
  PNotify.alert({
    text: text,
    type: type,
  });
};
