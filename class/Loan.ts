import { Fee } from "./Fee";
export class Loan {
  private initCapital: number = 0;
  private tin: number = 0;
  private tie: number = 0;
  private duration: number = 0;
  private periods: number = 0;
  private baseFee: number = 0;
  private aliveCapital: number = 0;
  private totalInterests: number = 0;

  private allFees: Fee[] = [];
  private currentFee: Fee;

  private formula: string = "((1+0,05)(1/12)) – 1";

  constructor(initCapital: number, tin: number, duration: number) {
    this.initCapital = parseFloat(initCapital);
    this.aliveCapital = initCapital;
    this.duration = duration;
    this.periods = duration * 12;
    this.baseFee = initCapital / this.periods;
    this.tin = tin;
    this.tie = Math.pow(1 + this.tin / 100, 1 / 12) - 1;

    this._initLoan();
  }

  //PUBLIC METHODS
  public getAllFees(): Fee[] {
    return this.allFees;
  }

  public getLoanDataJson() {
    return this.allFees.map((f) => {
      return { feeNumber: f.getJson().period, data: f.getJson() };
    });
  }
  public getFeeDataJson(period: number): {} {
    return this.getAllFees()[period - 1].getJson();
  }

  public getTotalPaid(): number {
    return this._round2Dec(this.initCapital + this.totalInterests);
  }
  public getTotalInterests(): number {
    return +this._round2Dec(this.totalInterests);
  }
  public getDuration() {
    return this.duration;
  }
  //PRIVATE METHODS

  private _initLoan(): void {
    this._setAllFees();
    this._setTotalInterests();
  }
  private _setAllFees(): Fee[] {
    let i: number = 1;
    for (i; i <= this.periods; i++) {
      this.currentFee = new Fee(this.aliveCapital, i, this.tie, this.baseFee);
      this.allFees.push(this.currentFee);
      this.aliveCapital = this.currentFee.getAliveCapital();
    }
    return this.allFees;
  }
  private _setTotalInterests(): void {
    this.totalInterests = this.allFees.reduce(
      (sum, e) => (typeof e.interest === "number" ? sum + e.interest : sum),
      0
    );
  }
  private _setValueTotal() {
    return this.allFees.reduce(
      (sum, value) =>
        typeof value.value === "number" ? sum + value.value : sum,
      0
    );
  }

  private _round2Dec(n: number): number {
    return +(Math.round((n + Number.EPSILON) * 1000) / 1000).toFixed(2);
  }
} //EOC
