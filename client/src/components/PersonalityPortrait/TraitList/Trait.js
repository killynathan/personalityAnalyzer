import React from 'react';
import Collapsible from 'react-collapsible';
import chevronDown from './chevron-down.svg';
import ReactTooltip from 'react-tooltip';

const Trait = ({ name, percentile, description, hasChildren }) => {
  let percent = decimalToPercentage(percentile);
  let ballStyle = {
    left: percent,
    backgroundColor: (percentile > 0.5 ? "#57c681" : "#37aaff")
  }
  let percentStyle = {
    left: percent
  }
  return (
    <div className="TraitList-traitContainer">
      <span data-tip data-for={name}><p className="TraitList-traitName">{ name }</p></span>
      <ReactTooltip id={name} effect="solid">
        <span>{ description }</span>
      </ReactTooltip>
      {hasChildren && <img src={chevronDown} className="TraitList-icon"/>}
      <div className="TraitList-percentBar">
        <p
          className="TraitList-percentNumber"
          style={percentStyle}
        >
          { percent }
        </p>
        <div
          className="TraitList-percentBall"
          style={ballStyle}></div>
      </div>

    </div>
  )
};

const decimalToPercentage = decimal => {
  let percentage = Math.floor(decimal * 100);
  return percentage + '%';
}

export default Trait;
