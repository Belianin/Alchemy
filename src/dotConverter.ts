import { Recipie } from "./data";

export function convertToDot(recipeies: Recipie[]) {
  const nodes = new Set(
    recipeies.flatMap((x) => [x.first, x.second, x.result])
  );

  return `digraph recepies {
        ${[...nodes].map((n) => `${escape(n)};`).join("\n")}
        ${recipeies
          .flatMap((x) => [
            `${escape(x.first)} -> ${escape(x.result)};`,
            `${escape(x.second)} -> ${escape(x.result)};`,
          ])
          .join("\n")}
    }`;
}

const escape = (value: string) =>
  value.replace("-", "minus").replace("+", "plus");
