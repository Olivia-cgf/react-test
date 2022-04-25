
import { post } from "./request";

interface BaseParms{
    qq: string
}

export function getMock(params:BaseParms): Promise<any>{
    return post(`/api/qq.info?qq=${params.qq}`);
}