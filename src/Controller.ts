/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';

export default abstract class Controller {
  readonly route!: Router;
}
