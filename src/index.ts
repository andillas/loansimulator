import $ from "jquery";
import { Grid } from "../class/Grid";
import { Loan } from "../class/Loan";
import "./styles.css";

function initPage(): void {
  //do some stuff at init
  var elGrid: Grid;

  let gridOptions: object = {
    caption: "Loan Simulation",
    cols: [
      {
        id: "period",
        title: "Período",
        type: "num",
        width: "20px",
        align: "right"
      },
      {
        id: "name",
        title: "Identificador",
        type: "str",
        width: "200px",
        align: "center"
      },
      {
        id: "quota",
        title: "Amortizado",
        type: "fl2",
        width: "100px",
        align: "right"
      },
      {
        id: "value",
        title: "Valor",
        type: "fl2",
        width: "100px",
        align: "right"
      },
      {
        id: "interest",
        title: "Intereses",
        type: "fl2",
        width: "70px",
        align: "right"
      },
      {
        id: "aliveCapital",
        title: "Capital Vivo",
        type: "fl2",
        width: "150px",
        align: "right"
      }
    ]
  };

  $("#visibleColumnsSwitcher > .form-check-label").on("click", (e: any) => {
    let chkId: string = $(e.target)
      .find("input")
      .prop("id")
      .replace("chkCol_", "");

    if (elGrid) elGrid.toggleColumnDisplay(chkId);
  });

  $("#btnCalculate").on("click", () => {
    let requestedCapital: number = parseFloat($.trim($("#resCapital").val()));
    let years: number = $.trim($("#resTiempo").val());
    let tinPercent: number = $.trim($("#resTin").val());

    if (
      isNaN(requestedCapital) ||
      requestedCapital < 1 ||
      isNaN(years) ||
      years < 1 ||
      isNaN(tinPercent) ||
      tinPercent < 0
    ) {
      alert(
        "Es imprescindible configurar el Capital solicitado, los Años y el TIN"
      );
      return;
    }

    let loan: Loan = new Loan(requestedCapital, tinPercent, years);
    let loanData: object = loan.getLoanDataJson();

    $("#resTotalIntereses").val(loan.getTotalInterests());
    $("#resTotalPagado").val(loan.getTotalPaid());

    elGrid = new Grid(loanData, "gridHolder", gridOptions);
    elGrid.reload();
  });
}
$(initPage);
