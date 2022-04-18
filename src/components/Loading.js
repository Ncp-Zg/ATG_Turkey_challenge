import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularUnderLoad({size}) {
  return <CircularProgress color="success" disableShrink size={size}/>;
}
