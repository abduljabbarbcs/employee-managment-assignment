import React from 'react';
import { Spinner } from 'app/components/Spinner';
import { AbsoluteFill } from 'app/components/Flex';
import { PropsOf } from '@emotion/styled-base/types/helper';

export class Loading extends React.Component<
  { loading?: boolean } & PropsOf<typeof Spinner>
> {
  render() {
    const { loading = true, ...rest } = this.props;
    return (
      <AbsoluteFill
        align="center"
        justify="center"
        testId="loading"
        css={{
          background: 'rgba(0, 0, 0, 0.2)',
          transition: 'all 0.25s ease',
          opacity: loading ? 1 : 0,
          zIndex: loading ? 2 : -1,
        }}>
        {loading && <Spinner {...rest} />}
      </AbsoluteFill>
    );
  }
}
