import React from 'react';
import TraitList from './TraitList/index.js';
import { Grid, Row, Col } from 'react-bootstrap';

const Personality = ({ personalityData }) => (
  <div>
    <Grid>
      <Row>
        <Col xs={12} md={4}>
          <TraitList
            title="Personality"
            traitList={personalityData.personality}
          />
        </Col>
        <Col xs={12} md={4}>
          <TraitList
            title="Needs"
            traitList={personalityData.needs}
          />
        </Col>
        <Col xs={12} md={4}>
          <TraitList
            title="Values"
            traitList={personalityData.values}
          />
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Personality;
