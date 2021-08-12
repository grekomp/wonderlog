import WonderHelper from "./WonderHelper.js";
import WonderImplementation from "./WonderImplementation.js";

type WonderLogFunction = (...content: LogEntry[]) => Wonder;

export type Wonder = WonderImplementation & WonderLogFunction;

export type LogEntry = Wonder | any;

const wonder = WonderHelper.create();
export default wonder;
