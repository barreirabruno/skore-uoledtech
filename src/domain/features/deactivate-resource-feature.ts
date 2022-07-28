export interface DeactivateResourceFeatureInterface {
  perform: (params: DeactivateContentResourceNamespace.Input) => Promise<DeactivateContentResourceNamespace.Output>
}

export namespace DeactivateContentResourceNamespace {
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    message: string
  }
}
