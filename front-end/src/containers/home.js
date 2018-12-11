import React, { Component }   from 'react'
import PropTypes              from 'prop-types'

// Material-UI
import { withStyles }         from '@material-ui/core/styles'
import TextField              from '@material-ui/core/TextField'
import Table                  from '@material-ui/core/Table'
import TableBody              from '@material-ui/core/TableBody'
import TableCell              from '@material-ui/core/TableCell'
import TableHead              from '@material-ui/core/TableHead'
import TableRow               from '@material-ui/core/TableRow'
import Paper                  from '@material-ui/core/Paper'
import Grid                   from '@material-ui/core/Grid'
import Button                 from '@material-ui/core/Button'
import Modal                  from '@material-ui/core/Modal'

// Contants
import * as constants         from '../constants/constants'
import xml from 'xml-js'

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
  },
  buttonPreview: {
    margin: theme.spacing.unit,
    height: '20px',
    marginTop: '30px'
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
})

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


class Home extends Component {
  state = {
    name: '',
    nameGet: '',
    datasource: [],
    class: [],
    open: false
  }

  async get(name) {
    this.setState({ nameGet: name })
    await fetch(constants.END_POINT + constants.CLASS + '/' + name)
    .then(response => response.json())
    .then(json => {
      this.setState({ datasource: json })
      localStorage.setItem(name, JSON.stringify(json))
    })
    .catch(err => {
      this.setState({ datasource: JSON.parse(localStorage.getItem(name)) })
      console.log('data>>>>', this.state.datasource)
    })
  }

  createCells() {
    const horas = constants.schedulesTable
    let db =  this.state.datasource
  
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
      })
    }
 
    for (let m in db) {
      for (let n in db[m].schedule) {
        for (let o in rows) {
          if (rows[o].hora === db[m].schedule[n]) {
            if (db[m].day[n] === 'Segunda-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: db[m].subject + ' - ' + db[m].teacher, terca: '', quarta: '', quinta: '', sexta: ''})
            } 
            if (db[m].day[n] === 'Terça-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: db[m].subject + ' - ' + db[m].teacher, quarta: '', quinta: '', sexta: ''})
            }
            if (db[m].day[n] === 'Quarta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: db[m].subject + ' - ' + db[m].teacher, quinta: '', sexta: ''})
            }
            if (db[m].day[n] === 'Quinta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: '', quinta: db[m].subject + ' - ' + db[m].teacher, sexta: ''})
            }
            if (db[m].day[n] === 'Sexta-feira') {
              rows.push({id: 0, hora: rows[o].hora, segunda: '', terca: '', quarta: '', quinta: '', sexta: db[m].subject + ' - ' + db[m].teacher })
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
    for (let k = 0; k < 7; k++) {
      id += 1
      let aux = rows[k]
      aux = Object.assign({}, aux, { id: id })
      newRows[k] = aux
    }
  
    return newRows  
  }

  handleOpen = () => {
    fetch('https://api.calendario.com.br/?ano=2018&estado=RJ&cidade=RIO_DAS_OSTRAS&token=Y2F1YS5yZXplbmRlQGhvdG1haWwuY29tJmhhc2g9NjAyNjM0MTI')
    .then(response => response.json())
    .then(json => {
      this.setState({ xlm: json })
    })
    .catch(err => {
      console.log(err)
    })

    this.setState({ 
      open: true, 
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  getHollidays = () => {
    //var result = xml.xml2json(this.state.xml, { compact: true, spaces: 4 })
    //console.log(result)
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
        <Grid container spacing={16}>
          <Grid item xs={6}>
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
            <Button 
                variant="contained"
                size="small"
                className={classes.buttonPreview}
                onClick={this.handleOpen}
              >
              API
            </Button>
          </Grid>
          <Grid item xs={4}>
        
            <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            className={classes.modal}
          >
            <div style={getModalStyle()} className={classes.paper}>
              {this.getHollidays()}
            </div>
          </Modal>
          </Grid>
          <Grid item xs={6}>
            <h2>Quadro de Horários</h2>
          </Grid>
        </Grid>
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
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.hora}
                    </CustomTableCell>
                    <CustomTableCell style={{textAlign: 'center'}} numeric>{row.segunda}</CustomTableCell>
                    <CustomTableCell style={{textAlign: 'center'}} numeric>{row.terca}</CustomTableCell>
                    <CustomTableCell style={{textAlign: 'center'}} numeric>{row.quarta}</CustomTableCell>
                    <CustomTableCell style={{textAlign: 'center'}} numeric>{row.quinta}</CustomTableCell>
                    <CustomTableCell style={{textAlign: 'center'}} numeric>{row.sexta}</CustomTableCell>
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
