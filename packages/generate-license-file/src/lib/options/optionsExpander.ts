/**
 * This type takes an intersection type and expands each intersected type into a new single type.
 *
 * Think of it like the following but for types rather than instances:
 * ```ts
 * const a = { a: 1 };
 * const b = { b: 2 };
 * const intersection = { ...a, ...b };
 * ```
 * a.k.a
 * ```ts
 * type A = { a: number };
 * type B = { b: number };
 * type Intersection = IntersectionExpander<A & B>;
 * ```
 *
 * This is really useful because it means that IDE tooltips
 * show all the fields from the intersected types rather than
 * just the intersection itself
 *
 * If you simply use:
 * ```ts
 * type Intersection = A & B;
 * ```
 *
 * Then an IDE tooltip will show:
 * ```ts
 * type Intersection = A & B;
 * ```
 *
 * But if you use
 * ```ts
 * type Intersection = IntersectionExpander<A & B>;
 * ```
 *
 * Then an IDE tooltip will show:
 * ```ts
 * type Intersection = {
 *  a: number;
 *  b: number;
 * }
 * ```
 *
 * This means we can use the `IntersectionExpander` type to
 * compose options interfaces together and have the IDE
 * show all the fields within each option interface.
 *
 * The composition of options interfaces is important because
 * it means we only need to write the JSdoc for each option once.
 *
 * @link https://stackoverflow.com/a/69288824/3075190
 */
export type IntersectionExpander<T> = T extends (...args: infer A) => infer R
  ? (...args: IntersectionExpander<A>) => IntersectionExpander<R>
  : T extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
