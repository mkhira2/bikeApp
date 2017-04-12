import React from 'react'
import ACTIONS from './actions'
import STORE from './store'
import { NavBar } from './navBar'
import { Header } from './header'
import StripeButton  from './StripeButton'
import { Form, FormGroup, FormControl, Col, ControlLabel, Checkbox, Button } from 'react-bootstrap'

export const SellView = React.createClass({
  _handleSubmit (evtObj) {
    evtObj.preventDefault()
    var formEl = evtObj.target
    console.log(formEl)
    var itemData = {
      make: formEl.make.value,
      model: formEl.model.value,
      price: parseInt(formEl.price.value),
      size: parseInt(formEl.size.value),
      year: parseInt(formEl.year.value),
      description: formEl.description.value,
      condition: formEl.condition.value,
      url: formEl.url.value,
      groupset: formEl.groupset.value
    }
    ACTIONS.addListing(itemData)

  },
  render () {
    return (
    <div >
        <Header />
        <NavBar />
        <StripeButton />
        <Form horizontal onSubmit={this._handleSubmit}>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              Make    
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Make" name='make'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              Model
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Model" name='model'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalNumber">
            <Col componentClass={ControlLabel} sm={2}>
              Price
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Price" name='price'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalNumber">
            <Col componentClass={ControlLabel} sm={2}>
              Size
            </Col>
            <Col sm={10} >
              <FormControl type="number" placeholder="Size" name='size'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalNumber">
            <Col componentClass={ControlLabel} sm={2}>
              Year
            </Col>
            <Col sm={10}>
              <FormControl type="number" placeholder="Year" name='year' />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              Descriptiom
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Description" name='description'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              Condition
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Condition" name='condition'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              URL
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Url" name='url'/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalText">
            <Col componentClass={ControlLabel} sm={2}>
              Group Set
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="Gruppo" name='groupset' />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Checkbox>Remember me</Checkbox>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Sign in
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
  )
  }
})

        