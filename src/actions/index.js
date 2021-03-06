export const STORE_ACTION = 'DEMO_COMPONENT/store_Obj_In_Array';
export const INCREMENT_INDEX_ACTION = 'DEMO_COMPONENT/Increment_Index';

export const storeObjInArrayAction = (obj) => {
  return {
    type: STORE_ACTION,
    obj
  };
}

export const incrementIndexAction = () => {
  return {
    type: INCREMENT_INDEX_ACTION
  };
}
