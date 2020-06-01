import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GetAppIcon from '@material-ui/icons/GetApp';
import { Avatar } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import About from './About';
import { repository, myGithub, myLinkedin, appDownload } from '../utils/constants';
import imageProfile from '../assets/imgs/profile.jpeg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    cursor: 'pointer',
  },
  icon: {
    color: theme.palette.common.white,
  },
  medium: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <About />
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title} onClick={() => setIsOpen(!isOpen)}>
            Analisador Sintático
          </Typography>
          <IconButton aria-label="download-app" href={appDownload}>
            <GetAppIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="linkedin-author" href={myLinkedin} target="_blank">
            <LinkedInIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="github-author" href={repository} target="_blank">
            <GitHubIcon className={classes.icon} />
          </IconButton>
          <IconButton aria-label="github-author" href={myGithub} target="_blank">
            <Avatar alt="Remy Sharp" src={imageProfile} className={classes.medium} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
