/// <reference path="../superagent/index.d.ts" />
// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/3e13cd8e459f428a6e46d993f853f77394d29d78/supertest/supertest.d.ts
declare module "supertest" {
  import * as superagent from "superagent"

  function supertest(app: any): supertest.SuperTest<supertest.Test>;

  namespace supertest {
    interface Response extends superagent.Response {
    }

    interface Request extends superagent.Request {
    }

    type CallbackHandler = (err: any, res: Response) => void;
    interface Test extends Request {
      app?: any;
      url: string;
      serverAddress(app: any, path: string): string;
      expect(status: number, callback?: CallbackHandler): this;
      expect(status: number, body: any, callback?: CallbackHandler): this;
      expect(body: string, callback?: CallbackHandler): this;
      expect(body: RegExp, callback?: CallbackHandler): this;
      expect(body: Object, callback?: CallbackHandler): this;
      expect(field: string, val: string, callback?: CallbackHandler): this;
      expect(fzield: string, val: RegExp, callback?: CallbackHandler): this;
      expect(checker: (res: Response) => any): this;
      end(callback?: CallbackHandler): this;
      end(buffer: Buffer, cb?: Function): void;
      end(str: string, cb?: Function): void;
      end(str: string, encoding?: string, cb?: Function): void;
    }

    function agent(app?: any): SuperTest<Test>;

    interface SuperTest<T> extends superagent.SuperAgent<T> {
    }

  }


  export = supertest;
}
