type InferValue<Prop extends PropertyKey, Desc> = Desc extends {
  get(): any;
  value: any;
}
  ? never
  : Desc extends { value: infer T }
  ? Record<Prop, T>
  : Desc extends { get(): infer K }
  ? Record<Prop, K>
  : never;

type DefineProperty<
  Prop extends PropertyKey,
  Desc extends PropertyDescriptor
> = Desc extends { writable: any; set(val: any): any }
  ? never
  : Desc extends { writable: any; get(): any }
  ? never
  : Desc extends { writable: false }
  ? Readonly<InferValue<Prop, Desc>>
  : Desc extends { writable: true }
  ? InferValue<Prop, Desc>
  : Readonly<InferValue<Prop, Desc>>;

export default function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor
>(
  obj: Obj,
  prop: Key,
  val: PDesc
): asserts obj is Obj & DefineProperty<Key, PDesc> {
  Object.defineProperty(obj, prop, val);
}

export function definePropertyGetter<
  Obj extends object,
  Key extends keyof K,
  K
>(
  obj: Obj,
  prop: Key,
  source: K
): asserts obj is Obj & DefineProperty<Key, { get(): K[Key] }> {
  Object.defineProperty(obj, prop, { get: () => source[prop] });
}

export function definePropertyValue<Obj extends object, Key extends keyof K, K>(
  obj: Obj,
  prop: Key,
  source: K
): asserts obj is Obj & DefineProperty<Key, { value: K[Key] }> {
  Object.defineProperty(obj, prop, { value: source[prop] });
}
