import React, { ReactElement } from "react";
import { MemoryRouter } from "react-router-dom";
import { act, create, ReactTestInstance } from "react-test-renderer";

type RenderOptions = {
  location?: string;
  act?: boolean;
};

const click = (element: ReactTestInstance) => {
  element.props.onClick();
}

const textOf = (...elements: (ReactTestInstance | string)[]): string => {
  return (
    elements.map(
      (element) => {
        if (typeof element == "string") {
          return element;
        } else {
          return textOf(...element.children);
        }
      }
    ).join("")
  );
}

function maybeAct<TReturn>(callback: () => TReturn, shouldAct?: boolean): TReturn {
  let returnValue;

  if (shouldAct) {
    act(() => { returnValue = callback() });
  } else {
    returnValue = callback();
  }

  return returnValue;
};

const render = (element: ReactElement, renderOptions: RenderOptions = {}) => {
  const {location, act} = renderOptions;

  return maybeAct(() => {
    return create(
      <MemoryRouter initialEntries={[location || '/']}>
        { element }
      </MemoryRouter>
    )
  }, act);
};

export {click, textOf, render};
