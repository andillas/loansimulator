import { Fee } from "./Fee";
export class Loan {
  private initCapital: number;
  private tin: number;
  private tie: number;
  private duration: number;
  private periods: number;
  private baseFee: number;
  private aliveCapital: number;

  private allFees: Fee[] = [];
  private currentFee: Fee;

  private formula: string = "((1+0,05)(1/12)) – 1";

  constructor(initCapital: number, tin: number, duration: number) {
    this.initCapital = initCapital;
    this.aliveCapital = initCapital;
    this.duration = duration;
    this.periods = duration * 12;
    this.baseFee = initCapital / this.periods;
    this.tin = tin;
    this.tie = this.getTie();

    this.setAllFees();
  }

  private addFeeToStack(f: Fee) {
    this.allFees.push(f);
  }

  private getTie() {
    return Math.pow(1 + this.tin / 100, 1 / 12) - 1;
  }

  public getAllFees(): Fee[] {
    return this.allFees;
  }
  public setAllFees(): Fee[] {
    let i: number = 1;
    for (i; i <= this.periods; i++) {
      this.currentFee = new Fee(
        this.aliveCapital,
        i,
        this.getTie(),
        this.baseFee
      );
      this.addFeeToStack(this.currentFee);
      this.setAliveCapital(this.currentFee.getAliveCapital());
    }
    return this.allFees;
  }
  private setAliveCapital(newAliveCapital: number) {
    this.aliveCapital = newAliveCapital;
  }

  public getLoanDataJson() {
    return this.allFees.map((f) => {
      return { feeNumber: f.getJson().period, data: f.getJson() };
    });
  }
  public getFeeDataJson(period: number): {} {
    return this.getAllFees()[period - 1].getJson();
  }
} //EOC
