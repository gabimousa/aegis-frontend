import { render } from '@testing-library/react';

import AegisShared from './aegis-shared';

describe('AegisShared', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AegisShared />);
    expect(baseElement).toBeTruthy();
  });
});
