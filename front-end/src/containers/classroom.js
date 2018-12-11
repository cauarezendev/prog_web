import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import _                      from 'lodash'
import axios                  from 'axios'

// Material-UI
import { withStyles }         from '@material-ui/core/styles'
import Grid                   from '@material-ui/core/Grid'
import ExpansionPanel         from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary  from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails  from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions  from '@material-ui/core/ExpansionPanelActions'
import TextField              from '@material-ui/core/TextField'
import Button                 from '@material-ui/core/Button'
import Divider                from '@material-ui/core/Divider'
import ExpandMoreIcon         from '@material-ui/icons/ExpandMore'
import Modal                  from '@material-ui/core/Modal'

// Components
import FormClass              from '../components/formclass'
import TimeSheet              from '../components/timesheet'

// Utils
import * as constants         from '../constants/constants'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  buttonClass: {
    margin: theme.spacing.unit,
    marginLeft: '30px',
    marginTop: '15px'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: '16px',
    marginLeft: '20px',
    height: '55px'
  },
  iconSmall: {
    fontSize: 20,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  expansion: {
    width: '100%',
    marginTop: '20px',
  },
  grid: {
    marginTop: '30px',
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  buttonPreview: {
    margin: theme.spacing.unit,
    height: '20px',
    marginTop: '30px'
  }
})

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    width: '90%',
    height: '90%',
  };
}

class ClassRoom extends Component {

  componentDidMount() {
    this.get()
  }

  state = {
    name: '',
    currency: '',
    visible: false,
    open: false,
    subject: '',
    infoSubjects: '',
    datasource: [],
    local: '',
    visibleSubject: true,
    form: {
      valueDays: [],
      valueSchedules: [],
      valueTeacher: '',
      valueCourse: '',
      valueStuff: '',
      count: 0,
    },
  }

  async get() {
    await fetch(constants.END_POINT + constants.CLASS + '/' + this.state.name)
    .then(response => response.json())
    .then(json => {
      this.setState({ datasource: json })
      localStorage.setItem(this.state.name, JSON.stringify(json))
    })
    .catch(err => {
      this.setState({ datasource: JSON.parse(localStorage.getItem(this.state.name)) })
    })
  }

  handleChangeClass = (e) => {
    this.setState({
      name: e.target.value,
    })  
    this.get()
  }

  handleChangeSubject = (e) => {
    this.setState({
      subject: e.target.value,
      infoSubjects: this.createSubject(e.target.value)
    }) 
    this.get() 
  }

  createSubject(subject) {
    let subs = this.state.datasource

    let obj = {}
    if (subject !== '') {
      for (let i in subs) {
        if (subs[i].subject === subject) {
          obj = Object.assign({}, obj, subs[i])
        }
      }
      
      let newForm = []
      for (let i in obj.day) {
        newForm.push(obj.day[i] + ': ' + obj.schedule[i])
      }

      obj = Object.assign({}, obj, { newForm: newForm })
      
      return (
        <div>
          <p>Curso: {obj.course}</p>
          <p>Professor: {obj.teacher}</p>
          {(obj.newForm).map(option => (
            <p key={Math.random()*1000}>
              {option}
            </p>
          ))}
        </div>
      )
    }
    else {
      return (
        <div>
        </div>
      )
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  
  handleAddCount = () => {
    let count = this.state.form.count
    count++
    this.setState({
      form: {
        ...this.state.form,
        count: count,
      }
    })
  }

  handleRemoveCount = () => {
    let count = this.state.form.count
    count--
  
    this.setState({
      form: {
        ...this.state.form,
        count: count,
      }
    })
  }

  handleButtonSave = async() => {
    let obj = {
      day: this.state.form.valueDays,
      schedule: this.state.form.valueSchedules,
      teacher: this.state.form.valueTeacher,
      course: this.state.form.valueCourse,
      subject: this.state.form.valueStuff,
    }
    obj = Object.assign({}, obj, { name: this.state.name })
    
    this.setState({
      form: {
        valueDays: [],
        valueSchedules: [],
        valueTeacher: '',
        valueCourse: '',
        valueStuff: '',
        count: 0,
      }
    })

    axios.post(constants.END_POINT + constants.CLASS, obj)
      .then((response) => {
        console.log(response.data)
      })

    this.setState({
      form: {
        valueDays: [],
        valueSchedules: [],
        valueTeacher: '',
        valueCourse: '',
        valueStuff: '',
        count: 0,
      }
    })
    this.get()
  }

  handleTextFieldChange = name => e => {
    switch (name) {
      case 'Dia':
        let aux = this.state.form.valueDays
        if (aux)
        aux[parseInt(e.target.id, 10)] = (e.target.value)
        this.setState({
          form: {
            ...this.state.form,
            valueDays: aux
          }
        })
        break
      case 'Horário':
        let auxs = this.state.form.valueSchedules
        auxs[parseInt(e.target.id, 10)] = (e.target.value)
        this.setState({
          form: {
            ...this.state.form,
            valueSchedules: auxs
          }
        })
        break
      case 'Professor':
        this.setState({
          form: {
            ...this.state.form,
            valueTeacher: e.target.value
          }
        })
        break
      case 'Curso':
        this.setState({
          form: {
            ...this.state.form,
            valueCourse: e.target.value
          }
        })
        break
      case 'Matéria':
        this.setState({
          form: {
            ...this.state.form,
            valueStuff: e.target.value
          }
        })
        break
      default:
        console.log(1)
    }
  }

  handleOpen = () => {
    this.setState({ 
      open: true, 
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  mountList() {
      let data = this.state.datasource
      let newData = []

      for (let i in data) {
        newData = data[i].day.filter(function(este, i) {
          return data[i].day.indexOf(este) === i;
        })
        data[i].day = newData
      }

      return data
  }

  getSubjects() {
    let data = this.state.datasource
    let row = []

    row.push('')
    for (let i in data) {
      row.push(data[i].subject)
    }
    return row
  }

  handleButtonDelete = () => {
    let data = this.state.datasource
    let subject = this.state.subject
  
    let obj = _.find(data, function(o) { return o.subject === subject })

    axios
    .delete(constants.END_POINT + constants.CLASS + '/' + obj._id)
    .then((response) => {
      console.log(response.data)
    })

    this.setState({
      subject: ''
    })
  }

  render() {
    const { classes } = this.props
    const subjects = this.getSubjects()
  
    return (
      <div className={classes.root}>
        <Grid container spacing={16}>
          <Grid item xs={6}>
            <TextField
              id="outlined-select-currency-native"
              select
              label="Sala"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChangeClass}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Escolha a sala"
              margin="normal"
              variant="outlined"
            >
              {constants.currencies.map(option => (
                <option key={Math.random()*1000} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Button 
              variant="contained"
              size="small"
              className={classes.buttonPreview}
              onClick={this.handleOpen}
            >
             Preview
            </Button>
          </Grid>
          <Grid item xs={6}>
          <h1>Cadastro de Salas</h1>
        </Grid>
        </Grid>
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.modal}
          >
            <div style={getModalStyle()} className={classes.paper}>
              <TimeSheet name={this.state.name}/>
            </div>
          </Modal>
          
        <Grid container spacing={24} className={classes.grid}>
        </Grid>
        <Grid container spacing={24} className={classes.grid}>
          <ExpansionPanel 
            className={classes.expansion}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <h4 className={classes.heading}>Adicionar matéria</h4>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <FormClass 
                form={this.state.form} 
                add={this.handleAddCount}
                rem={this.handleRemoveCount}
                change={this.handleTextFieldChange}
              />
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button 
                size="small" 
                onClick={this.handleCancel}
              >
                Fechar
              </Button>
              <Button size="small" color="primary" onClick={this.handleButtonSave}>
                Salvar
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel> 
          
          <ExpansionPanel 
            className={classes.expansion}
            expanded={this.state.visibleSubject}
          >
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div className={classes.column}>
                <h4 className={classes.heading}>Lista matérias</h4>
              </div>
              <TextField
                id="outlined-select-currency-native"
                select
                className={classes.textField}
                value={this.state.subject}
                onChange={this.handleChangeSubject}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Escolha a matéria"
                margin="normal"
                variant="outlined"
              >
                {subjects.map(option => (
                  <option key={Math.random()*1000} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                {this.state.infoSubjects}
              </div>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
              <Button 
                size="small" 
                onClick={this.handleCancel}
              >
                Fechar
              </Button>
              <Button size="small" color="primary" onClick={this.handleButtonDelete}>
                Deletar
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel> 
        </Grid>
      </div>
    )
  }
}

ClassRoom.propTypes = {
  classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(ClassRoom)
