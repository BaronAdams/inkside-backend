import { type NextRequest, NextResponse } from "next/server";

export type NextFunction = ()=> void;
export type Middleware = (
    request: NextRequest,
    next: NextFunction
) => Promise<NextResponse | void>