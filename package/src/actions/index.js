export const SOME_ACTION = 'DEMO_COMPONENT/store_Obj_In_Array';
export const Increment = 'DEMO_COMPONENT/Increment';

export const storeObjInArrayAction = (obj) => {
  return {
    type: SOME_ACTION,
    obj
  };
}

export const IncrementIndex = () => {
  return {
    type: Increment
  };
}
