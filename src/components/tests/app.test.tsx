import React from 'react';
import { create } from 'react-test-renderer';
import App from '../app';

describe('App', () => {
  const app = create(<App/>);

  it('test', () => {
    expect(app.toJSON()).toMatchInlineSnapshot(`
      <h1>
        Hello world!
      </h1>
    `);
  });
});
