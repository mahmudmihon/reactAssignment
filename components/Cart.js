import React, { useReducer, useContext, createContext } from "react";
import { getCart } from '../helpers/cartHelper'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const arr = [...state, action.addedProduct];
     
      let p = arr.filter(x => x.pName === action.addedProduct.pName);

      if(p.length > 1){
        let updatedArray = arr.filter(x => x.pName !== action.addedProduct.pName)

        return [...updatedArray, action.addedProduct];
      }
      else {
        return [...state, action.addedProduct];
      }
    case "REMOVE":
      const newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "CLEAR":
      const allElements = [...state];
      allElements.splice(0, allElements.length);
      return allElements;
    default:
      throw new Error(`unknown action ${action.type}`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getCart());

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);