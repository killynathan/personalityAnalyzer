import React from 'react';
import Collapsible from 'react-collapsible';

const Trait = ({ name, percentile }) => {
  let percent = decimalToPercentage(percentile);
  let ballPosition = {
    left: percent
  }
  return (
    <div className="TraitList-traitContainer">
      <p>{ name }: { percent }</p>
      <div className="TraitList-percentBar">
        <div
          className="TraitList-percentBall"
          style={ballPosition}></div>
      </div>

    </div>
  )
};

const decimalToPercentage = decimal => {
  let percentage = Math.floor(decimal * 100);
  return percentage + '%';
}

export default Trait;
