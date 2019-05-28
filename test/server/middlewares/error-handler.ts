export = () => {
  return async (ctx: any, next: any) => {
    try {
      await next();
    } catch (e) {
      ctx.status = e.status || 500;
      ctx.body = { error: '10001', message: e.message };
    }
  };
};