import React from 'react';
import Trait from './Trait';
import SubTrait from './SubTrait';
import './TraitList.css';
import Collapsible from 'react-collapsible';
import traitDescriptions from './traitDescriptions';

const TraitList = ({ title, traitList }) => (
  <div className='TraitList-container'>
    <p className="TraitList-title"> {title} </p>
    <ul>
      {traitList.map(trait => (
        <li>
          <Collapsible
            trigger={
              <Trait
                name={trait.name}
                percentile={trait.percentile}
                description={traitDescriptions[trait.name]}
                hasChildren={'children' in trait}
              />
            }
          >
            {
              'children' in trait && (
                trait.children.map((trait, i) => (
                  <Trait
                    name={trait.name}
                    percentile={trait.percentile}
                    description={traitDescriptions[trait.name]}
                    hasChildren={'children' in trait}
                  />
                ))
              )
            }
          </Collapsible>
        </li>
      ))}
    </ul>
  </div>
);

export default TraitList;
