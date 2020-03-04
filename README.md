# express-controller-decorator

<<<<<<< HEAD
This is simple routing module for Express in TypeScript.

If you need more features, you need to choose other modules.
=======
This is a simple routing module for Express in TypeScript.

You need a lot of functions, you shoud choice
>>>>>>> 767a5890cdd51525b0e62448b9dc09bec691f0bd

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

### return string or object value auto Response.send()

```
@Route('/api')
class ApiController extends Controller {
  @Get('/')
  index(req:Request, res:Responce): string {
    ...
    return 'ok' // => res.send('ok')
  }

  @Get('/:id')
  show(req:Request, res:Resopnse) {
    ...
    return { id: value } // => res.json({ id: value })
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
