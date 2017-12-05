import React from 'react';

const TraitContent = ({ name, percentile }) => (
  <div style={styles.container}>
    <p>{ name }: {decimalToPercentage(percentile)}</p>
    <div className="TraitList-progressBar"></div>
  </div>
);

const decimalToPercentage = decimal => {
  let percentage = Math.floor(decimal * 100);
  return percentage + '%';
}

const styles = {
  container: {
    paddingLeft: "10px",
    boxSizing: "border-box"
  }
};

export default TraitContent;
