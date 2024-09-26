import { encrypt } from "./lib/jwt";

const token = encrypt({userId:"765afhe34bm"})
console.log(token)
