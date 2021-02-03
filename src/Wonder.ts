import WonderHelper from "./WonderHelper";
import WonderImplementation from "./WonderImplementation";

type WonderLogFunction = (...content: LogEntry[]) => Wonder;

export type Wonder = WonderImplementation & WonderLogFunction;

export type LogEntry = Wonder | any;

export const wonder = WonderHelper.create();
