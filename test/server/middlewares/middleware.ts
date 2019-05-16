export function m1 () {
  return async function (ctx: any, next: any) {
    console.log('----------> m1 here');
    await next();
  };
}

export function m2 () {
  return async function (ctx: any, next: any) {
    console.log('----------> m2 here');
    await next();
  };
}

export function m3 () {
  return async function (ctx: any, next: any) {
    console.log('----------> m3 here');
    await next();
  };
}

export function m4 () {
  return async function (ctx: any, next: any) {
    console.log('----------> m4 here');
    await next();
  };
}