import React, { Component }   from 'react'
import { Link }               from 'react-router-dom'
import PropTypes              from 'prop-types'
import { 
  Switch, 
  Route 
}                             from 'react-router-dom'

// Material-UI
import { withStyles }         from '@material-ui/core/styles'
import Drawer                 from '@material-ui/core/Drawer'
import AppBar                 from '@material-ui/core/AppBar'
import Toolbar                from '@material-ui/core/Toolbar'
import List                   from '@material-ui/core/List'
import Typography             from '@material-ui/core/Typography'
import ListItem               from '@material-ui/core/ListItem'
import ListItemIcon           from '@material-ui/core/ListItemIcon'
import ListItemText           from '@material-ui/core/ListItemText'
import Collapse               from '@material-ui/core/Collapse'
import InboxIcon              from '@material-ui/icons/MoveToInbox'
import ExpandLess             from '@material-ui/icons/ExpandLess'
import ExpandMore             from '@material-ui/icons/ExpandMore'
import StarBorder             from '@material-ui/icons/StarBorder'
import HomeIcon               from '@material-ui/icons/Home'

// Containers
import Home                   from '../containers/home'
import ClassRoom              from '../containers/classroom'

const drawerWidth = 240

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    minHeight: '100vh',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#484848'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    marginTop: '20px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar,
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  },
  linkrouter: {
    textDecoration: 'none',
  },
  menuitem: {
    marginLeft: '-50px'
  },
  menuHome: {
    marginLeft: '16px'
  }
})

class Routes extends Component {
  state = {
    menu: {
      home: 'Home',
      register: 'Cadastro',
      classroom: 'Horários',
      teachers: 'Salas',
    },
    open: false,
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    const { classes } = this.props

    const listMenu = (
      <div>
        <ListItem button>
          <ListItemIcon>
            <HomeIcon/>
          </ListItemIcon>
          <Link to="/" className={classes.linkrouter}>
            <ListItemText primary={this.state.menu.home} className={classes.menuHome}/>
          </Link>
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
        <ListItemText inset primary={this.state.menu.register} />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <Link to="/classroom" className={classes.linkrouter}>
                <ListItemText inset primary={this.state.menu.classroom} className={classes.menuitem}/>
              </Link>
            </ListItem>
          </List>
        </Collapse>
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <Typography variant="title" color="inherit" noWrap>
              PROGRAMAÇÃO WEB
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{listMenu}</List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/classroom" component={ClassRoom} />
            </Switch>
        </main>
      </div>
    )
  }
}

Routes.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Routes)