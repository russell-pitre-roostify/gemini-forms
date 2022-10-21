import {PathSeparator} from "../Node";

export default (parts: string[]): string => {
    return parts.join(PathSeparator)
}