import $ from "jquery";
import * as GridInterface from "../types/grid";
import { LoanData } from "../types/loan";

class Grid {
  private holder: string = "app";
  private caption: string = "";
  private cols: any[] = [];
  private data: LoanData[] = [];

  private defaultStyle: object = [
    { width: "100px" },
    { align: "center" },
    { display: "block" }
  ];

  constructor(
    data: LoanData[],
    holder: string,
    options: GridInterface.GridOptions
  ) {
    console.log("new Grid");
    this.data = data;
    this.holder = holder;
    if (options) this.setParams(options);
    this._init();
  }

  //PUBLIC METHODS

  public setParams(p: object) {
    Object.keys(p).forEach((k, v) => {
      this[k] = p[k];
    });
  }

  public reload() {
    $("#" + this.holder).html("");
    this._init();
  }

  public setPropertyById(id: string, p: string, v: any) {
    let index: number = this._getIndexCol("id", id);

    if (index > -1) this.cols[index][p] = v;
    this.reload();
  }

  public toggleColumnDisplay(idCol: string) {
    let columnIndex: number = this._getIndexCol("id", idCol);
    let status: any = this._getPropertyById(idCol, "display");

    if (columnIndex > -1) {
      this.cols[columnIndex].display =
        status === "none" ? "table-inline" : "none";
    }
    this.reload();
  }

  //END PUBLIC METHODS
  // PRIVATE METHODS

  private _init() {
    this._generateTable();
  }

  private _getPropertyById(idCol: string, prop: string) {
    let columnIndex: number = this._getIndexCol("id", idCol);

    return this.cols[columnIndex][prop];
  }
  private _round2Dec(n: any) {
    return (Math.round((n + Number.EPSILON) * 1000) / 1000).toFixed(2);
  }

  private _getIndexCol(k: string, v: any) {
    let indexElement: number = -1;

    this.cols.find((e: any, i: number) => {
      indexElement = i;
      return e[k] === v;
    });

    return indexElement;
  }

  private _getCellStyle(idCol: number): string {
    let cellWidth: string = this.cols[idCol].width || this.defaultStyle.width;
    let cellAlign: string = this.cols[idCol].align || this.defaultStyle.align;
    let cellDisplay: string =
      this.cols[idCol].display || this.defaultStyle.display;

    let cellStyle: string = `width:${cellWidth}; text-align: ${cellAlign}; display: ${cellDisplay}`;
    return cellStyle;
  }

  private _getCellContent(data: any, colId: number) {
    let cellContent: any = data[this.cols[colId].id];

    switch (this.cols[colId].type) {
      case "fl2":
        cellContent = this._round2Dec(cellContent);
        break;
      case "int":
        cellContent = parseInt(cellContent, 10);
        break;
    }

    return cellContent;
  }

  private _generateGridCells() {
    let htmlCells: string = "";

    this.data.forEach((e: any) => {
      htmlCells += `<tr>`;

      for (var i: number = 0; i < this.cols.length; i++) {
        htmlCells += `<td class="GRID_cell" style="${this._getCellStyle(i)}">
                        ${this._getCellContent(e.data, i)}
                      </td>`;
      }
      htmlCells += `</tr>`;
    });

    return htmlCells;
  }
  private _generateHeaders() {
    let html: string = "";

    this.cols.forEach((e) => {
      let style: string = `width:${e.width || this.defaultStyle.width}; 
                           text-align: ${e.align || this.defaultStyle.align};
                           display: ${e.display || this.defaultStyle.display};`;
      html += `<th style="${style}">${e.title}</th>`;
    });
    return html;
  }
  private _generateTable() {
    let htmlContent: string = this._generateGridCells();
    let htmlHeaders: string = this._generateHeaders();
    let htmlTable: string = `<table id="GRID_tbl" class="mui-table mui-table--bordered">
                            <caption>${this.caption}</caption>
                            <thead>${htmlHeaders}</thead>
                            <tbody>${htmlContent}</tbody>
                            </table>`;

    return $("#" + this.holder).append(htmlTable);
  }

  //END PRIVATE METHODS
} //EOC
export { Grid };
