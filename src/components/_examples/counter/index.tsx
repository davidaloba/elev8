import React from "react";
import { useSelector } from "react-redux";

import { increase, decrease } from "../../../store/actions";
import { RootState } from "../../../store/reducers";
import { useAppDispatch } from "../../../store/store";

export default function Counter() {
  const dispatch = useAppDispatch();
  const count = useSelector((state: RootState) => state.counter.count);

  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button type="button" onClick={() => dispatch(increase())}>
          +
        </button>
        <span>{count}</span>
        <button type="button" onClick={() => dispatch(decrease())}>
          -
        </button>
      </div>
      <a href="https://react-redux.js.org/" target="_blank">
        Go To Documentation
      </a>
    </div>
  );
}
