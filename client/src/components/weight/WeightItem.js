import React from 'react'
import { connect } from 'react-redux'
import { Col, ListGroupItem, Row } from 'react-bootstrap'
import DeleteButton from '../layout/DeleteButton'

import { deleteWeight } from '../../state/weight/weightActions'

const WeightItem = ({ weight, deleteWeight }) => {
  const { name, value } = weight

  return (
    <ListGroupItem action>
      <Row>
        <Col>{name}</Col>
        <Col>{value} lb</Col>
        <Col>
          <DeleteButton action={() => deleteWeight(weight)} />
        </Col>
      </Row>
    </ListGroupItem>
  )
}

const mapActionsToProps = { deleteWeight }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(WeightItem)
