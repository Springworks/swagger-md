declare module "json-schema-ref-parser" {
  export = RefParser;

  class RefParser {
    constructor();

    schema: any;
    $refs: Refs;

    dereference(spec: any, options?: RefParser.Options): Promise<any>;
    bundle(spec: any, options?: RefParser.Options): Promise<any>;
    parse(spec: any, options?: RefParser.Options): Promise<any>;
    resolve(spec: any, options?: RefParser.Options): Promise<any>;
  }

  class Refs {
    circular: boolean;
    paths(...types: Array<string>): Array<string>;
    values(...types: Array<string>): { [path: string]: string };
    exists(ref: string): boolean;
    get(ref: string): string;
    set(ref: string, value: any): void;
  }

  namespace RefParser {
    export interface Options {
      external?: boolean;
    }
  }
}
