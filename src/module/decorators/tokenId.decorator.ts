import { createParamDecorator } from '@nestjs/common'

export const TokenId = createParamDecorator((data, ctx) => {
  const req = ctx.switchToHttp().getRequest()
  delete req.user.iat
  delete req.user.exp
  console.log('decorator',req.user)
  return req.user
});
