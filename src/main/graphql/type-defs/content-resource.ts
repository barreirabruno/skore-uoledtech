import { gql } from 'apollo-server-express'

export default gql`

  scalar Date

  input ContentResourceInput {
    published: Int!
    name: String!
    description: String!
    type: String!
  }

  type ContentResourceOutput {
    id: String!
    published: Int!
    name: String!
    description: String!
    type: String!
    createdAt: Date!
  }

  extend type Mutation {
    add (params: ContentResourceInput!): ContentResourceOutput!
  }
`