import React, { ReactElement } from "react";
import { Link, MemoryRouter } from "react-router-dom";
import { create, ReactTestInstance } from "react-test-renderer";

type RouterProps = {
  location?: string;
};

const click = (element: ReactTestInstance) => {
  element.props.onClick();
}

const textOf = (...elements: ReactTestInstance[]): string => {
  return (
    elements.map<string>(
      (element) => {
        if (element.children.length && typeof element.children[0] == "string") {
          return element.children.join();
        } else {
          return textOf(...element.children as ReactTestInstance[]);
        }
      }
    ).join()
  );
}

const render = (element: ReactElement, routerProps: RouterProps = {}) => {
  const {location} = routerProps;
  return create(
    <MemoryRouter initialEntries={[location || '/']}>
      { element }
    </MemoryRouter>
  );
};

export {click, textOf, render};
