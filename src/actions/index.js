export const SOME_ACTION = 'SOME_ACTION';

export function demoSomeAction(id, value) {
  return {
    type: SOME_ACTION,
    id,
    value
  };
}
