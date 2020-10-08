import $ from "jquery";
class Grid {
  private holder: string = "app";
  private caption: string = "";
  private cols: any[] = [];
  private data: [] = [];

  private defaultStyle: object = [
    { width: "100px" },
    { align: "center" },
    { display: "block" }
  ];

  constructor(data: [], holder: string, params?: object) {
    this.data = data;
    this.holder = holder;
    if (params) this.setParams(params);
    this._init();
  }

  private _init() {
    this._generateTable();
  }

  public setParams(p: object) {
    Object.keys(p).forEach((k, v) => {
      this[k] = p[k];
    });
    //console.log(this);
  }
  private _round2Dec(n: any) {
    return (Math.round((n + Number.EPSILON) * 1000) / 1000).toFixed(2);
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
                           text-align: ${this.defaultAlign};
                           display: ${e.display || this.defaultStyle.display};`;
      html += `<th style="${style}">${e.title}</th>`;
    });
    return html;
  }
  private _generateTable() {
    let htmlContent: string = this._generateGridCells();
    let htmlHeaders: string = this._generateHeaders();
    let htmlTable: string = `<table id="GRID_tbl">
                            <caption>${this.caption}</caption>
                            <thead>${htmlHeaders}</thead>
                            <tbody>${htmlContent}</tbody>
                            </table>`;

    return $("#" + this.holder).append(htmlTable);
  }
  public reload() {
    $("#" + this.holder).html("");
    this._init();
  }
  private _getIndexCol(o: [], k: string, v: any) {
    let indexElement: number = -1;

    o.find((e: any, i: number) => {
      indexElement = i;
      return e[k] === v;
    });

    return indexElement;
  }
  public setPropertyById(id: string, p: string, v: any) {
    let index: number = this._getIndexCol(this.cols, "id", id);

    if (index > -1) this.cols[index][p] = v;
    console.log(this.cols);
    this.reload();
  }
} //EOC
export { Grid };
