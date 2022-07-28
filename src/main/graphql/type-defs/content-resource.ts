import { gql } from 'apollo-server-express'

export default gql`

  scalar Date

  input ContentResourceInput {
    id: String
    published: Int!
    name: String!
    description: String!
    type: String!
  }

  input ContentResourceUpdateInput {
    id: String
    name: String!
    description: String!
    type: String!
  }
  
  input ContentResourceDeactivateInput {
    id: String!
  }

  type ContentResourceOutput  {
    id: String!
    published: Int!
    name: String!
    description: String!
    type: String!
    created_at: String!
    updated_at: String!
  }

  extend type Mutation {
    add (params: ContentResourceInput!): ContentResourceOutput! @auth
    update (params: ContentResourceUpdateInput!): ContentResourceOutput! @auth
    deactivate (params: ContentResourceDeactivateInput!): ContentResourceOutput! @auth
  }
`
