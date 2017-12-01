import React from 'react';
import Trait from './Trait';

const TraitList = ({ title, traitList }) => (
  <div>
    <ul>
      {traitList.map((trait => {
        <Trait
          name={trait.name}
          percentile={trait.percentile}
          subTraits={('children' in trait) ? trait.children : null}
      }))}
    </ul>
  </div>
)
