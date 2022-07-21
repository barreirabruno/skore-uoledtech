import { ContentResource } from '@/domain/entities'

export default class ContentResourceRepo {
  contentResourcesList: ContentResource[] = []

  add (newContentResource: ContentResource): void {
    this.contentResourcesList.push(newContentResource)
  }
}
