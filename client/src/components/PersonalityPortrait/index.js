import React from 'react';
import TraitList from './TraitList';
import { Grid, Row, Col } from 'react-bootstrap';
import "./PersonalityPortrait.css";

const PersonalityPortrait = ({ personalityData, username }) => (
  <div>
    <p className="PersonalityPortrait-title">{`Personality Portrait of ${username}`}</p>
    <Grid>
      <Row>
        <Col xs={12}>
          <p className="PersonalityPortrait-explanation">
            *% = percentile.  For example, a 90% on Extraversion does not
            mean that the person is 90% extroverted. It means that for that
            single trait, the person is more extroverted than 90% of the
            people in the population.
          </p>
        </Col>
      </Row>
    </Grid>
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

export default PersonalityPortrait;
