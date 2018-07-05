export = (format = ':method ":url"') => {
  return async (ctx: any, next: any) => {
    const str = format.replace(':method', ctx.method).replace(':url', ctx.url);
    console.log(str);
    await next();
  };
};