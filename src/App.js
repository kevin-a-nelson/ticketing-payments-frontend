import logo from './logo.svg';
import './App.css';
import Select from 'react-select'
import { StripeCheckout } from './StripeCheckout'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'

import { Dropdown } from 'semantic-ui-react'

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const options = [
  { key: 1, value: 'Event 1', text: 'Event 1' },
  { key: 2, value: 'strawberry', text: 'Event 2' },
  { key: 3, value: 'vanilla', text: 'Event 3' }
]

function createTicketQuantityOptions() {
  let ticketQuantityOptions = []
  for(let i = 0; i < 30; i++) {
    let ticketQuantityOption = {
      value: i, value: i, text: `${i}`
    }
    ticketQuantityOptions.push(ticketQuantityOption)
  }
  return ticketQuantityOptions
}


const ticketQuantityOptions = createTicketQuantityOptions()

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fullName: "",
      email: "",
      eventName: "",
      ticketQuantity: null,
      event: "",
      totalCost: 0
    }
  }

  handleDropDownChange = (event, data) => {
    this.setState({
      event: data.value
    })
  }

  handleTicketQuantityChange = (event, data) => {
    this.setState({
      ticketQuantity: data.value
    })
  }
  
  handleFullNameChange = (event, data) => {
    this.setState({
      fullName: data.value
    })
  }

  handleEmailChange = (event, data) => {
    this.setState({
      email: data.value
    })
  }

  buyTickets() {
    const params = {
      "team_name": this.state.fullName,
      "total_cost": this.state.ticketQuantity * 15 * 100,
      "number_of_tickets": this.state.ticketQuantity,
      "email": this.state.email,
    }
    console.log(params)
    axios.post("https://ticketing-payments-backend.herokuapp.com/api/ticket-payments", params)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error)
    }) 
  }

  render() {
    return (
      <div className="App">
        <h1>Total Cost: ${this.state.ticketQuantity * 15}</h1>
        <Form>
          <Form.Group widths='equal'>
            <Form.Select
              label="Event Name"
              placeholder='Select Event'
              search
              selection
              onChange={this.handleDropDownChange}
              options={options}
            />
            <Form.Select
              label="Ticket Quantity"
              placeholder='Select Quantity'
              search
              selection
              onChange={this.handleTicketQuantityChange}
              options={ticketQuantityOptions}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input
              label="Full Name"
              placeholder='Select Event'
              search
              selection
              onChange={this.handleFullNameChange}
              options={options}
            />
            <Form.Input
              label="Email"
              placeholder='Select Quantity'
              search
              selection
              onChange={this.handleEmailChange}
              options={ticketQuantityOptions}
            />
          </Form.Group>
        </Form>
        <Button
          onClick={this.buyTickets.bind(this)}
        >
          Buy Tickets
        </Button>
      </div>
    );
  }
}

