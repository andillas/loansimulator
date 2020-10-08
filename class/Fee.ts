export class Fee {
  period: number;
  name: string;
  quota: number;
  tie: number;
  aliveCapital: number;
  value: number = 0;

  constructor(
    lastAliveCapital: number,
    period: number,
    tie: number,
    quota: number
  ) {
    this.aliveCapital = lastAliveCapital;
    this.period = period;
    this.quota = quota;
    this.tie = tie;
    this.name = this.uniqueId(period.toString());

    this.generateFee();
  }
  uniqueId = (seed?: string): string => {
    return (`${seed}/` || "") + Math.random().toString(36).slice(2);
  };

  getJson = (): object => {
    let objFee: object = {
      period: this.period,
      name: this.name,
      value: this.value,
      quota: this.quota,
      aliveCapital: this.aliveCapital
    };
    return objFee;
  };

  getAliveCapital = (): number => {
    return this.aliveCapital;
  };

  private generateFee = (): void => {
    this.value = this.aliveCapital * this.tie + this.quota;
    this.aliveCapital -= this.quota;
  };
} //EOC
