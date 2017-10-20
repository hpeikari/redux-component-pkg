export const SOME_ACTION = 'DEMO_COMPONENT/SOME_ACTION';
export const Increment = 'DEMO_COMPONENT/Increment';

export const demoSomeAction = (id, obj) => {
  return {
    type: SOME_ACTION,
    id,
    obj
  };
}

export const IncrementIndex = () => {
  return {
    type: Increment
  };
}
