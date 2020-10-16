import $ from "jquery";
import { Grid } from "../class/Grid";
import { Loan } from "../class/Loan";
import "./styles.css";

function initPage(): void {
  //do some stuff at init

  let loan: Loan = new Loan(10000, 5, 3);
  let loanData: object = loan.getLoanDataJson();

  let gridOptions: object = {
    caption: "titu prueba 2",
    cols: [
      {
        id: "period",
        title: "Period",
        type: "num",
        width: "20px",
        align: "right"
      },
      {
        id: "name",
        title: "Name",
        type: "str",
        width: "200px",
        align: "center"
      },
      {
        id: "quota",
        title: "Amortized",
        type: "fl2",
        width: "100px",
        align: "right"
      },
      {
        id: "value",
        title: "Value",
        type: "fl2",
        width: "100px",
        align: "right"
      },
      {
        id: "aliveCapital",
        title: "Alive Capital",
        type: "fl2",
        width: "150px",
        align: "right"
      }
    ]
  };

  let elGrid: Grid = new Grid(loanData, "gridHolder", gridOptions);

  $("#btnRename").on("click", () => {
    elGrid.setPropertyById("name", "title", "Fee Name");
    elGrid.setPropertyById("name", "align", "right");
    elGrid.setPropertyById("name", "display", "none");
    elGrid.setPropertyById("value", "title", "Amount");
  });
}
$(initPage);
