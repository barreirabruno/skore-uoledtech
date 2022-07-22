import { InternalServerError } from '@/domain/entities/errors/internal-server-error'

export interface LoadContentResourceRepositoryInterface {
  load: (input: LoadTransactionRepositoryNamespace.Input) => Promise<LoadTransactionRepositoryNamespace.Output>
}

export namespace LoadTransactionRepositoryNamespace {
  export type Input = {
    id: string
  }
  export type Output = {
    id: string
    published: number
    name: string
    description: string
    type: string
    createdAt: string
    updatedAt: string
  } | InternalServerError | undefined
}

export interface SaveContentResourceRepositoryInterface {
  save: (input: SaveTransactionRepositoryNamespace.Input) => Promise<SaveTransactionRepositoryNamespace.Output>
}

export namespace SaveTransactionRepositoryNamespace {
  export type Input = {
    id?: string
    published: number
    name: string
    description: string
    type: string
  }
  export type Output = {
    id: string
    published: number
    name: string
    description: string
    type: string
    createdAt: string
    updatedAt: string
  } | InternalServerError
}
