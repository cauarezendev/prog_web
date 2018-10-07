import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import _                      from 'lodash'

// Material-UI
import { withStyles }         from '@material-ui/core/styles'
import Button                 from '@material-ui/core/Button'
import TextField              from '@material-ui/core/TextField'
import AddIcon                from '@material-ui/icons/Add'
import DeleteIcon             from '@material-ui/icons/Delete'

import * as constants         from '../constants/constants'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '300px',
  },
  textFieldOutlined: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '50px',
    width: '300px'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  div: {
    marginTop: 30
  },
  buttonSave: {
    margin: theme.spacing.unit,
    marginTop: 20,
    backgroundColor: "#2196f3" 
  },
  buttonDel: {
    margin: theme.spacing.unit,
    marginTop: 20,
    backgroundColor: "#9E9E9E"
  },
  timeSheet: {
    width: '100%'
  },
})

class FormClass extends Component {
  render() {
    const { classes } = this.props

    const timeSheet = _.times(this.props.form.count, i => (
      <div key={i} className={classes.timeSheet}>
        <TextField
          className={classes.textField}
          /* id="outlined-select-currency-native" */
          id={(i+1).toString()}
          select
          label="Dia"
          value={this.props.form.valueDays[i + 1]}
          onChange={this.props.change('Dia')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Escolha um dia da semana"
          margin="normal"
          variant="outlined"
        >
          {constants.days.map(option => (
            <option key={Math.random() * 10000} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>            
        <TextField
          className={classes.textField}
          /* id="outlined-select-currency-native" */
          id={(i+1).toString()}
          select
          label="Horário"
          value={this.props.form.valueSchedules[i + 1]}
          onChange={this.props.change('Horário')}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Escolha um horário"
          margin="normal"
          variant="outlined"
        >
          {constants.schedules.map(option => (
            <option key={Math.random() * 10000} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
    ))
      
    return (
      <div style={{ display: 'block' }}>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="outlined-required"
            label="Curso"
            className={classes.textField}
            value={this.props.form.valueCourse}
            onChange={this.props.change('Curso')}
            margin="normal"
            variant="outlined"
            helperText="Digite o nome do curso"
          />
          <TextField
            required
            id="outlined-required"
            label="Matéria"
            className={classes.textField}
            value={this.props.form.valueStuff}
            onChange={this.props.change('Matéria')}
            margin="normal"
            variant="outlined"
            helperText="Digite o nome da matéria"
          />
          <TextField
            required
            id="outlined-required"
            label="Professor"
            className={classes.textField}
            value={this.props.form.valueTeacher}
            onChange={this.props.change('Professor')}
            margin="normal"
            variant="outlined"
            helperText="Digite o nome do professor"
          />
          <div className={classes.div}>
            <TextField
              className={classes.textField}
              /* id="outlined-select-currency-native" */
              id="0"
              select
              label="Dia"
              value={this.props.form.valueDays[0]}
              onChange={this.props.change('Dia')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Escolha um dia da semana"
              margin="normal"
              variant="outlined"
            >
              {constants.days.map(option => (
                <option key={Math.random() * 10000} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              className={classes.textField}
              /* id="outlined-select-currency-native" */
              id="0"
              select
              label="Horário"
              value={this.props.form.valueSchedules[0]}
              onChange={this.props.change('Horário')}
              SelectProps={{
                native: true,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Escolha um horário"
              margin="normal"
              variant="outlined"
            >
              {constants.schedules.map(option => (
                <option key={Math.random() * 10000} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <Button 
              variant="fab" 
              mini 
              
              aria-label="Add" 
              className={classes.buttonSave}
              onClick={this.props.add}
            >
              <AddIcon />
            </Button>
            <Button 
              aria-label="Delete" 
              variant="fab"
              mini
              color="secondary"
              className={classes.buttonDel}
              onClick={this.props.rem}
            >
              <DeleteIcon />
            </Button>
          </div>
          {timeSheet} 
        </form>
      </div>
    )
  }
}

FormClass.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FormClass)
