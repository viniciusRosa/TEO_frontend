import styled, { keyframes } from 'styled-components';

const dualRing = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }

`;

const Loader = styled.div`

  display: inline-block;
  width: 80px;
  height: 80px;

    &:after {
      content: "";
      display: block;
      width: 64px;
      height: 64px;
      margin: 8px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: 1.2s ${dualRing} infinite;
    }

`;

export default Loader
