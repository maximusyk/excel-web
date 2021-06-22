import { shouldResize } from "./table.functions";
import { resizeHandler } from "./table.resize";
import { createTable } from "@/components/table/table.template";
import { ExcelComponent } from "@core/ExcelComponent";

export class Table extends ExcelComponent {
  static className = "excel__table";

  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ["mousedown"],
    });
  }

  toHTML() {
    return createTable(250);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
