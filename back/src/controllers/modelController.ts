import { Request, Response } from "express";
import { ExampleModel } from "../services/modelModel";

export class ExampleController {

    register = (req: Request, res: Response) => {
        res.status(200).send(ExampleModel.example());
    }
}