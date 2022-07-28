export interface DeactivateResourceFeatureInterface {
  perform: (params: AddContentResourceNamespace.Input) => Promise<AddContentResourceNamespace.Output>
}

export namespace AddContentResourceNamespace {
  export type Input = {
    id: string
  }
  export type Output = String
}
