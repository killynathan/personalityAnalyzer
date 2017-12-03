import React from 'react';
import TraitList from './TraitList';

const Trait = ({ name, percentile, subTraits }) => (
  <div>
    <p>{ name }</p>
    <p>{ percentile }</p>
    {subTraits &&
      <TraitList
        name='Children'
        traitList={subTraits}
      />}

  </div>
);

export default Trait;
