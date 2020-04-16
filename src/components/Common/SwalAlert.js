import swal from "sweetalert";

export default function swalAlert(
  title,
  text,
  icon = "warning",
  buttons = [false, "Okay"],
  cb,
  fallback
) {
  swal({
    title: title,
    text: text,
    icon: icon,
    buttons: buttons,
  }).then((val) => {
    if (val)
      if (cb) cb();
      else if (fallback) fallback();
  });
}
