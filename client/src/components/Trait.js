import React from 'react';

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
