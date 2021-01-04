export const totalWeight = exercise =>
  exercise.weights.reduce(
    (sum, weight) => sum + weight.weight.value * weight.number,
    0
  )
