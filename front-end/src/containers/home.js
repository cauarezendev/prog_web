import React, { Component }   from 'react'
import PropTypes              from 'prop-types'
import axios                  from 'axios'

// Material-UI
import { withStyles }         from '@material-ui/core/styles'
import TextField              from '@material-ui/core/TextField'
import Table                  from '@material-ui/core/Table'
import TableBody              from '@material-ui/core/TableBody'
import TableCell              from '@material-ui/core/TableCell'
import TableHead              from '@material-ui/core/TableHead'
import TableRow               from '@material-ui/core/TableRow'
import Paper                  from '@material-ui/core/Paper'

// Contants
import * as constants         from '../constants/constants'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '300px'
  }
})

class Home extends Component {
  state = {
    name: '',
    nameGet: '',
    datasource: []
  }

  get(name) {
    axios
    .get(constants.END_POINT + constants.CLASS + '/' + name)
    .then((response) => {
      if (response.data !== '') {
        this.setState({
          datasource: response.data,
        })
      } 
      else {
        this.setState({
          datasource: {}
        })
      }
    })
  }

  createCells() {
    const horas = constants.schedulesTable
    const db = this.state.datasource
    let id = 0
    let rows = []

    for (let i in horas) {
      rows.push({ 
        id: 0,
        hora: horas[i].value,
        segunda: '',
        terca: '',
        quarta: '',
        quinta: '',
        sexta: '',
        sabado: ''
      })
    }
 
    for (let m in db) {
      for (let n in db[m].schedule) {
        for (let o in rows) {
          if (rows[o].hora === db[m].schedule[n]) {
            if (db[m].day[n] === 'Segunda-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: db[m].subject, terca: '', quarta: '', quinta: '', sexta: '', sabado: ''})
            } 
            if (db[m].day[n] === 'Terça-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: db[m].subject, quarta: '', quinta: '', sexta: '', sabado: ''})
            }
            if (db[m].day[n] === 'Quarta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: db[m].subject, quinta: '', sexta: '', sabado: ''})
            }
            if (db[m].day[n] === 'Quinta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: '', quinta: db[m].subject, sexta: '', sabado: ''})
            }
            if (db[m].day[n] === 'Sexta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: '', quinta: '', sexta: db[m].subject, sabado: ''})
            }
            if (db[m].day[n] === 'Sabado') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: '', quinta: '', sexta: '', sabado: db[m].subject})
            }
          }
        }
      }
    }

    for (let m = 0; m < rows.length; m++) {
      for (let n = (m + 1); n < rows.length; n++) {
        if (rows[m].hora === rows[n].hora) {
          if (rows[m].segunda === '' && rows[n].segunda !== '') {
            let dia = rows[n].segunda 
            rows[m] = Object.assign({}, rows[m], {id: id, segunda: dia})    
          }
          if (rows[m].terca === '' && rows[n].terca !== '') {
            let dia = rows[n].terca 
            rows[m] = Object.assign({}, rows[m], {id: id, terca: dia})    
          }
          if (rows[m].quarta === '' && rows[n].quarta !== '') {
            let dia = rows[n].quarta 
            rows[m] = Object.assign({}, rows[m], {id: id, quarta: dia})    
          }
          if (rows[m].quinta === '' && rows[n].quinta !== '') {
            let dia = rows[n].quinta 
            rows[m] = Object.assign({}, rows[m], {id: id, quinta: dia})    
          }
          if (rows[m].sexta === '' && rows[n].sexta !== '') {
            let dia = rows[n].sexta 
            rows[m] = Object.assign({}, rows[m], {id: id, sexta: dia})    
          }
          if (rows[m].sabado === '' && rows[n].sabado !== '') {
            let dia = rows[n].sabado 
            rows[m] = Object.assign({}, rows[m], {id: id, sabado: dia})    
          }
          rows.splice(n, 1)
        }
      }
    }

    let newRows = []
    for (let k = 0; k < ((rows.length/2)); k++) {
      id += 1
      let aux = rows[k]
      aux = Object.assign({}, aux, { id: id })
      newRows[k] = aux
    }
    console.log(newRows)
    return newRows
  }

  handleChange = (e) => {
    this.setState({
      name: e.target.value,
    })
    this.get(e.target.value)
  }

  render() {
    const { classes } = this.props
    const rows = this.createCells()
    return (
      <div>
        <h2>Quadro de Horários</h2>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Sala"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange}
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
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell></CustomTableCell>
                <CustomTableCell numeric>Segunda-feira</CustomTableCell>
                <CustomTableCell numeric>Terça-feira</CustomTableCell>
                <CustomTableCell numeric>Quarta-fera</CustomTableCell>
                <CustomTableCell numeric>Quinta-feira</CustomTableCell>
                <CustomTableCell numeric>Sexta-feira</CustomTableCell>
                <CustomTableCell numeric>Sábado</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.hora}
                    </CustomTableCell>
                    <CustomTableCell numeric>{row.segunda}</CustomTableCell>
                    <CustomTableCell numeric>{row.terca}</CustomTableCell>
                    <CustomTableCell numeric>{row.quarta}</CustomTableCell>
                    <CustomTableCell numeric>{row.quinta}</CustomTableCell>
                    <CustomTableCell numeric>{row.sexta}</CustomTableCell>
                    <CustomTableCell numeric>{row.sabado}</CustomTableCell>
                  </TableRow>
                )
              })} 
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Home)
