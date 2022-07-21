import { GraphQLScalarType, Kind } from 'graphql'

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Scalar for Date type',
  serialize (value: any) {
    return value.toString()
  },
  parseValue (value: any) {
    return new Date(value)
  },
  parseLiteral (ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10))
    }
    return null
  }
})
