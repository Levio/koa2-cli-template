export class Demo {
  demoAttr1?: string;
  demoAttr2?: number;

  constructor(data?: Demo) {
    if (!data) return;
    this.init();
  }

  init(data?: Demo) {
    if (!data) return;
    this.demoAttr1 = data.demoAttr1;
    this.demoAttr2 = data.demoAttr2;
  }
}
