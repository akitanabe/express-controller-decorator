# express-controller-decorator

This is simple routing module for Express in TypeScript.

If you need more features, you need to choose other modules.

## Basic Usage

```
import {Controller, Route, Get} from 'express-controller-decorator'

@Route('/api')
class ApiController extends Controller {
  @Get('/')
  index(req: Request, res:Response, next: NextFunction){
    ...
  }
}

app.use(new ApiController().route);

```

### is Equal

```
import { Router } from 'express';

const router = Router();

router.get('/', function(req:Request, res:Response){
  ...
})

app.use('/api', router)

```

### return value auto Response.send()

```
@Route('/api')
class ApiController extends Controller {
  @Get('/')
  index(req:Request, res:Responce): string {
    ...
    return 'ok' // => res.send('ok')
  }

  @Get('/show/:id')
  show(req:Request, res:Resopnse) {
    ...
    return { id: value } // => res.send({ id: value })
  }

  // return Promise ok
  @Get('/')
  async findAll():{ id :string }[] {
    ...
    return [{id: value}] // => res.send([{id: value}])
  }
}
```

## use Middleware

```
import { Middleware } from 'express-controller-decorator'

@Route('/api')
class ApiController extends Controller {
  @Get('/')
  @Middleware(logger)
  index(){
    ...
  }
}

```
