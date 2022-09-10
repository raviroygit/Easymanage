import { Typography, LinearProgress, withStyles, Box } from "@material-ui/core";

const ColorLinearProgress = withStyles({
  bar: {
    backgroundColor: '#ff6c5c',
  },
})(LinearProgress);


const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        {props.error ? <ColorLinearProgress color='secondary' variant="determinate" {...props} /> :
          <LinearProgress color='primary' variant="determinate" {...props} />
        }

      </Box>
      <Box sx={{ minWidth: 35 }}>
        {props.error ?
          <Typography variant="body2" color="text.secondary">Failed</Typography> :
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        }

      </Box>
    </Box>
  );
}

export default LinearProgressWithLabel;