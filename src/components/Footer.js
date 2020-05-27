import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function Footer() {
  return (
    <Box mt={2} mb={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        João Vitor Veronese Vieira © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Footer;
