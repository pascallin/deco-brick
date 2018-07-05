export = () => {
  return async (ctx: any, next: any) => {
    try {
      await next();
    } catch (e) {
      console.error(e.stack);
      ctx.status = ctx.status || 500;
      ctx.body = { error: '10001', message: e.message };
    }
  };
};