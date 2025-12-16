import { render } from '@testing-library/react';

import AegisUi from './aegis-ui';

describe('AegisUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AegisUi />);
    expect(baseElement).toBeTruthy();
  });
});
