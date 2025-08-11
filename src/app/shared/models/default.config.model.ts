export class DefaultConfig {
  login!: DefaultConfigLogin;
  products!: DefaultConfigProducts;
  firebase!: DefaultConfigFirebase;
  show!: DefaultConfigShow;
  add!: DefaultConfigAdd;
  edit!: DefaultConfigEdit;
}

export class DefaultConfigLogin {}
export class DefaultConfigProducts {
    add!: DefaultConfigAdd;
    show!: DefaultConfigShow;
    edit!: DefaultConfigEdit;
}
export class DefaultConfigShow {}
export class DefaultConfigAdd {}
export class DefaultConfigEdit {}
export class DefaultConfigFirebase {
  dbUrl!: string;
}
