import { $ } from "../../core/dom";

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest("[data-type='resizable']");
  const coords = $parent.getCoords();
  const type = $resizer.data.resize;
  const sideProp = type === "col" ? "bottom" : "right";
  const limit = {
    x: coords.width - 40,
    y: coords.height - 20,
  };
  let value;

  $resizer.css({
    opacity: 1,
    [sideProp]: "-5000px",
  });

  document.onmousemove = (e) => {
    if (type === "col") {
      const delta = e.pageX - coords.right;
      console.log("Delta Col", delta);
      value = coords.width + delta;
      $resizer.css({
        right: value <= 40 ? limit.x + "px" : -delta + "px",
      });
    } else {
      const delta = e.pageY - coords.bottom;
      console.log("Delta Row", delta);
      value = coords.height + delta;
      $resizer.css({
        bottom: value <= 20 ? limit.y + "px" : -delta + "px",
      });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === "col") {
      $parent.css({ width: value <= 40 ? "40px" : value + "px" });
      $root
        .findAll(`[data-col='${$parent.data.col}']`)
        .forEach(
          (element) =>
            (element.style.width = value <= 40 ? "40px" : value + "px")
        );
    } else {
      $parent.css({ height: value <= 20 ? "20px" : value + "px" });
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
