export default class ServiceContaionr {
  private ServiceList: Array<Process> = [];
  private static instance: ServiceContaionr;
  static getInstance (): ServiceContaionr {
    if (!this.instance) {
    this.instance = new ServiceContaionr();
    }
    return this.instance;
  }
}