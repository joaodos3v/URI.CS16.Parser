import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import BaseInformationPanels from './BaseInformationPanels';
import { grammar, first, follow } from '../utils/constants';

function BaseInformation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <ExpansionPanel expanded={isExpanded} onChange={() => setIsExpanded(!isExpanded)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-label="Expand"
        aria-controls="additional-actions1-content"
        id="additional-actions1-header"
      >
        <Typography variant="h6" color="textSecondary">
          Informações Base
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <BaseInformationPanels title="GRAMÁTICA" rows={grammar} />
          </Grid>
          <Grid item xs={4}>
            <BaseInformationPanels title="FIRST" rows={first} />
          </Grid>
          <Grid item xs={4}>
            <BaseInformationPanels title="FOLLOW" rows={follow} />
          </Grid>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default BaseInformation;
