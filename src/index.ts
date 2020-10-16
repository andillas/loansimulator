import $ from "jquery";
import { Grid } from "../class/Grid";
import { Loan } from "../class/Loan";
import "./styles.css";

function initPage(): void {
  //do some stuff at init
  let requestedCapital: number = 10000;
  let years: number = 5;
  let tinPercent: number = 3;

  let loan: Loan = new Loan(requestedCapital, years, tinPercent);
  let loanData: object = loan.getLoanDataJson();

  let gridOptions: object = {
    caption: "Loan Simulation",
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
        id: "interest",
        title: "Interest",
        type: "fl2",
        width: "70px",
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

  $("label > input").on("click", (e) => {
    let chkId: string = e.target.id.replace("chkCol_", "");

    elGrid.toggleColumnDisplay(chkId);
  });
}
$(initPage);
