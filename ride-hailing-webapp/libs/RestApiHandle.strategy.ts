import { PrismaClient, driver, ride, user, vehicle } from "@prisma/client";
import { ZodRawShape, z } from "zod";
import drivers from "../pages/admin/drivers";
import { NextApiRequest, NextApiResponse } from "next";

type ZodSchemas<T extends ZodRawShape> = z.ZodEffects<z.ZodObject<T>> | z.ZodObject<T>

type QueryablePrismaType = user | driver | vehicle | ride;




function InferZodType<T extends ZodRawShape>(obj: any, schema: ZodSchemas<T>): z.infer<typeof schema> {
  return schema.parse(obj);
}

type AnyFunction<R extends any, P extends any[]> = (...args: P) => R;

function CallRepoFunc<R extends any, P extends any[]>(func: AnyFunction<R, P>, params: P): R {
  return func(...params);
}

export default function RestApiHandler<Z extends ZodRawShape, R extends any>(res: NextApiResponse,
  obj: any, schema: ZodSchemas<Z>,
  query_func: AnyFunction<R, [z.infer<typeof schema>]>,
  response: (res: NextApiResponse, data: R | null, err?: Error) => void) {
  try {
    response(res, query_func(schema.parse(obj)));
  } catch (e) {
    response(res, null, e as Error);
  }
}


