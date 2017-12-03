import React from 'react';
import Trait from './Trait';

const TraitList = ({ title, traitList }) => (
  <div>
    <ul>
      {traitList.map(trait => (
        <li>
          <Trait
            name={trait.name}
            percentile={trait.percentile}
            subTraits={('children' in trait) ? trait.children : null}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default TraitList;
