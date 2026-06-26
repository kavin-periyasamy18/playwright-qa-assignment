import { test } from '@playwright/test';

export function testStep(stepName?: string) {
  return function <T extends (this: any, ...args: any[]) => any>(
    originalMethod: T,
    context: ClassMethodDecoratorContext
  ) {
    return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
      const name = stepName ?? String(context.name);

      return test.step(name, async () => {
        return originalMethod.apply(this, args);
      });
    };
  };
}