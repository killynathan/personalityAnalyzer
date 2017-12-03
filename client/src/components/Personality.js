import React from 'react';
import TraitList from './TraitList';

const Personality = ({ personalityData }) => (
  <div>
    <TraitList
      name="personality"
      traitList={personalityData.personality}
    />
  </div>
);

export default Personality;
