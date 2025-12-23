export type JoinOp = 'AND' | 'OR'

export type ConditionKey = '' | 'name' | 'owner' | 'number'

export type ConditionRule = {
  id: string
  condition: ConditionKey
  value: string
}

export type ConditionGroup = {
  id: string
  joinOp: JoinOp
  rules: ConditionRule[]
}
