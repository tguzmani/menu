import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useToggle from '../../hooks/useToggle'
import { readWeights, readWeightTypes } from '../../state/weight/weightActions'
import { capitalize } from '../../utils'
import AccordionButton from '../layout/AccordionButton'

import Loading from '../layout/Loading'
import Weights from '../weight/Weights'
import WeightForm from '../weight/WeightForm'

import { weightTypes } from '../../utils/constants'

const WeightsPage = ({ weightState, readWeights, readWeightTypes }) => {
  const { loading, weights, types } = weightState

  const [toggle, bindToggle] = useToggle()

  useEffect(() => {
    if (weights.length === 0) readWeights()
    if (types.length === 0) readWeightTypes()
  }, [])

  if (loading) return <Loading />

  const weightsByType = type => weights.filter(weight => weight.type === type)

  return (
    <div>
      <h1 className='my-5'>Weights</h1>
      <AccordionButton text='Add Weight' {...bindToggle} />
      {toggle && <WeightForm />}
      {weightTypes.map(
        type =>
          weightsByType(type).length > 0 && (
            <>
              <h4 className='mt-3'>{capitalize(type)}</h4>
              <Weights weights={weightsByType(type)} />
            </>
          )
      )}
    </div>
  )
}

const mapActionsToProps = { readWeights, readWeightTypes }

const mapStateToProps = state => ({ weightState: state.weight })

export default connect(mapStateToProps, mapActionsToProps)(WeightsPage)
